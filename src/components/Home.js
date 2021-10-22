import { Link } from "react-router-dom";
import { Container, Row, Image, Col } from "react-bootstrap";

const wordStyle = {
  textAlign:'center',
  padding:'28px',
}

export const Home = ({ memes }) => {
  return (
    <div>
      <h1 style={wordStyle}>Meme Generator Gallery</h1>
      
      <Container>
        <Row>
          {memes.map((meme) => (
            <Col xs={6} md={3}>
              <Link key={meme.id} to={`/${meme.id}`}>
                <Image
                  src={meme.url}
                  rounded
                  style={{ width: "100px", marginTop:"5px" }}
                  alt={"meme"}
                />
                <br/>
                {meme.name}
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
