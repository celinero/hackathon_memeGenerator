import { Link } from "react-router-dom";
import { Container, Row, Image, Col } from "react-bootstrap";
// const wordStyle = {
//   textAlign:'center',
//   padding:'25px',
// }

const colStyle = {
  // border: '1px solid red',
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  textAlign: "center",
  padding: 16,
};

export const Home = ({ memes }) => {
  return (
    <div className="containerStyle">
      <h1 className="wordStyle">Meme Generator Gallery</h1>

      <Container>
        <Row className=" mx-auto text-center">
          <p> To create your own meme, select an image first!</p>
          {memes.map((meme) => (
            <Col xs={6} md={4} style={colStyle} key={meme.id}>
              <Link to={`/${meme.id}`}>
                <Image
                  src={meme.url}
                  rounded
                  style={{
                    width: "100%",
                    height: "200px",
                    marginBottom: "5px",
                    boxSizing: "border-box",
                    border: "9px solid black",
                  }}
                  alt={"meme"}
                />
                <br />
                <br />
                {meme.name}
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};
