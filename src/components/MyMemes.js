import React from "react";
import { Container, Image, Carousel } from "react-bootstrap";

import { getFromStorage } from "../useLocalStorage";

export function MyMemes() {
  const memes = getFromStorage();

  return (
    <Container className="mt-4 mx-auto text-center containerStyle" style={{ padding: '0 20px'}}>
      <h1 className='wordStyle'>Meme Generator</h1>
      <br />
      <h2>Keep track of your previous memes</h2>
      <br />
      <br />
      <Carousel variant="dark">
        {memes.map((meme) => (
          <Carousel.Item>
            <Image
              style={{ marginTop: "25px" }}
              src={meme.url}
              rounded
              className="d-block w-80 mx-auto"
              alt={"meme"}
            />
            <Carousel.Caption style={{ top: "-25px", bottom: "auto" }}>
              <p>{meme.name}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}
