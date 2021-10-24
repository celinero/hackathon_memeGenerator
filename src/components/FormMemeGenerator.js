import { useState } from "react";

import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { addToStorage } from "../useLocalStorage";

export const FormMemeGenerator = ({ meme }) => {
  // destructuring by passing the info into the state
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  // delete const template.id
  // create a new variable for the custom meme
  const [finalMeme, setFinalMeme] = useState(null);
  const [validated, setValidated] = useState(false);

  //handle validation when user add user
  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    // logic for create custom meme from api
    // move the const params and headers up
    const params = {
      template_id: meme.id,
      text0: topText,
      text1: bottomText,
      // update login as the one provided didn't work
      username: process.env.REACT_APP_IMGFLIP_USERNAME,
      password: process.env.REACT_APP_IMGFLIP_PASSWORD,
    };

    const response = await fetch("https://api.imgflip.com/caption_image", {
      // stringify didn't work, replace by params
      body: new URLSearchParams(params).toString(),
      // modify to POST instead of GET
      method: "POST",
      // add headers
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const result = await response.json();
    setFinalMeme(result.data.url);
    addToStorage({
      name: meme.name,
      date: new Date(),
      url: result.data.url,
    });
  };

  return (
    <div>
      {/* add validation on form */}
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
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please, provide a valid text.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Button variant="secondary" type="submit" className="mb-2">
                Create Meme
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
      <br />

      {/* render the custom meme */}
      <Container className="mt-4 mx-auto text-center">
        {finalMeme && <img src={finalMeme} alt="custom meme" />}
      </Container>
    </div>
  );
};
