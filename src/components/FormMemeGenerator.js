import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button, Container, Alert } from "react-bootstrap";
import { addToStorage } from "../useLocalStorage";

export const FormMemeGenerator = ({ meme }) => {
  // destructuring by passing the info into the state
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  // create a custom meme setting into state
  const [finalMeme, setFinalMeme] = useState(null);
  //validation
  const [validated, setValidated] = useState(false);
  //set errors
  const [error, setError] = useState(null);

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
      template_id: meme.id,
      text0: topText,
      text1: bottomText,
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
            <Col xs="auto">
              {/* create a input for up text and it functionality */}
              <Form.Group controlId="validationCustom01">
                {/* Form Top Text */}
                <Form.Control
                  required
                  type="text"
                  placeholder="top text"
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                ></Form.Control>
                {/* validation on text provided */}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please, provide a valid text.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col xs="auto">
              {/* create a input for bottom text and it functionality */}
              <Form.Group controlId="validationCustom02">
                {/* Form Bottom Text */}
                <Form.Control
                  required
                  type="text"
                  placeholder="bottom text"
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                />
                {/* validation on text provided */}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please, provide a valid text.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Button
                variant="secondary"
                type="submit"
                className="mb-2"
                disabled={!meme.id}
              >
                Create Meme
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      <br />
      {!meme.id && (
        <Alert variant="warning">
          Please select a picture template from the{" "}
          <Link to="/home">gallery</Link> first
        </Alert>
      )}
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
