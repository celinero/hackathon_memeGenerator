import { Link } from "react-router-dom";
import { Container, Row, Image, Col } from "react-bootstrap";

export const Home = ({ memes }) => {
  return (
    <div>
      <h1>Meme Generator</h1>
      <h2>Gallery</h2>
      <Container>
        <Row>
          {memes.map((meme) => (
            <Col xs={6} md={4}>
              <Link key={meme.id} to={`/${meme.id}`}>
                <Image
                  src={meme.url}
                  rounded
                  style={{ width: "100px" }}
                  alt={"meme"}
                />
                {meme.name}
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
