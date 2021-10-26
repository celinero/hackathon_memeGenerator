import { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Home } from "./components/Home";
import { MyMemes } from "./components/MyMemes";
import { GenerateMeme } from "./components/GenerateMeme";
import Background from "./images/backgroundImg.jpg";

import { Navbar, Container, Nav, Row, Col } from "react-bootstrap";

function App() {
  const [memes, setMemes] = useState([]);

  // fetch data on parent to be available to his children: Home and GenerateMeme
  const fetchMemes = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const results = await response.json();

    if (results.success) {
      setMemes(results.data.memes);
    }
  };

  // fetch after mount (componentDidMount)
  // because the component cannot have a async render
  // need to render first, then to update its internal state with the result of api call
  useEffect(() => {
    fetchMemes();
  }, []);

  return (
    <BrowserRouter>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">CWN</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            {/* <Nav.Link href="/:template_id">Create your Meme</Nav.Link> */}
            <Nav.Link href="/mymemes">My Memes</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div style={{ backgroundImage: `url(${Background})`, padding: "20px" }}>
        {/* display page */}
        <Switch>
          <Route exact path="/home">
            <Home memes={memes} />
          </Route>
          <Route exact path="/mymemes">
            <MyMemes />
          </Route>
          {/* dynamic route as it uses a param */}
          <Route exact path="/:template_id">
            <GenerateMeme memes={memes} />
          </Route>

          {/* redirect to the home page for the first render */}
          <Redirect to="/home" />
        </Switch>
      </div>

      <footer
        style={{
          background: "rgb(33, 37, 41)",
          color: "white",
          padding: "20px 0",
        }}
      >
        <Container>
          <Row>
            <Col style={{ fontSize: "1 rem" }}>
              Copyright 2021 by Winny, Natacha, Celine
            </Col>
          </Row>
        </Container>
      </footer>
    </BrowserRouter>
  );
}

export default App;
