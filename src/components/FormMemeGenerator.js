import { useState } from "react";

import { useHistory, Link } from "react-router-dom";

import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap";
import { addToStorage } from "../useLocalStorage";

export const FormMemeGenerator = ({ meme }) => {
  // destructuring by passing the info into the state
  // variables to define how many boxes/inputs a template will need
  const count = meme.box_count;
  const arrayFromCount = Array.from(Array(count).keys());
  const [boxValues, setBoxValues] = useState({});

  // create a custom meme setting into state
  const [finalMeme, setFinalMeme] = useState(null);
  //validation
  const [validated, setValidated] = useState(false);
  //set errors
  const [error, setError] = useState(null);

  const history = useHistory();

  //handle validation when user add user
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    // logic for the validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // logic for create custom meme from api
    const params = {
      ...boxValues,
      template_id: meme.id,
      // set secure login on .env file
      username: process.env.REACT_APP_IMGFLIP_USERNAME,
      password: process.env.REACT_APP_IMGFLIP_PASSWORD,
    };

    try {
      const response = await fetch("https://api.imgflip.com/caption_image", {
        // set url by params
        body: new URLSearchParams(params).toString(),
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      // add the custom memes into storage
      const result = await response.json();
      setFinalMeme(result.data.url);
      addToStorage({
        name: meme.name,
        date: new Date(),
        url: result.data.url,
      });
    } catch {
      setError(true);
    }
  };

  return (
    <div>
      {/* add validation on form  */}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Container style={{ justifyContent: "center" }}>
          <Row className="mb-3">
            // loop through each input/box
            {arrayFromCount.map((entry, index) => {
              const name = `boxes[${index}][text]`;
              return (
                <Col xs="auto" key={index}>
                  <Form.Group controlId={`validationCustom${index}`}>
                    <Form.Control
                      required
                      type="text"
                      placeholder={`box ${index + 1}`}
                      value={boxValues[name]}
                      onChange={(e) => {
                        setBoxValues({
                          ...boxValues,
                          [name]: e.target.value,
                        });
                      }}
                    ></Form.Control>
                    {/* validation on text provided */}
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid">
                      Please, provide a valid text.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              );
            })}

            <Col>
              <br />
              <Form.Group className=" mx-auto text-center">
                <Button
                  variant="secondary"
                  type="submit"
                  className="mb-2"
                  disabled={!meme.id}
                >
                  Create Meme
                </Button>
                &nbsp;
                <Button
                  variant="secondary"
                  type="submit"
                  className="mb-2"
                  onClick={() => history.push("/home")}
                >
                  Back
                </Button>
                &nbsp;
                <Button
                  variant="secondary"
                  type="submit"
                  className="mb-2"
                  onClick={() => history.push("/mymemes")}
                >
                  See Your Created Memes
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
      <br />
      {/* warning message if no template is selected */}
      {!meme.id && (
        <Alert variant="warning">
          Please select a picture template from the{" "}
          <Link to="/home">gallery</Link> first
        </Alert>
      )}
      {/* danger message if there is an error */}
      {error && (
        <Alert variant="danger">
          OOPS something went wrong, please try again!
        </Alert>
      )}
      {/* render the custom meme */}
      <Container className="mt-4 mx-auto pb-4 text-center">
        {finalMeme && <img src={finalMeme} alt="custom meme" />}
      </Container>
    </div>
  );
};
