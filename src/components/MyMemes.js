import React from "react";
import { Container, Image, Carousel } from "react-bootstrap";
import { getFromStorage } from "../useLocalStorage";

export function MyMemes() {
  const memes = getFromStorage();

  return (
    //use bootstrap to style the my memes gallery
    <Container className="containerStyle mx-auto text-center " style={{ padding: "10px" }}>
      <h1 className="wordStyle">My Memes</h1>
      <br />
      <h2>Keep track of your previous memes</h2>
      <br />
      <br />
      <Carousel variant="dark">
        {/* display the custom memes by mapping */}
        {memes.map((meme) => (
          <Carousel.Item>
            <Image
              style={{ marginTop: "25px" }}
              src={meme.url}
              rounded
              className="d-block w-80 mx-auto"
              alt={"meme"}
            />
            {/* display the name on the current custom meme */}
            <Carousel.Caption style={{ top: "-25px", bottom: "auto" }}>
              <p>{meme.name}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
      <br />
    </Container>
  );
}
