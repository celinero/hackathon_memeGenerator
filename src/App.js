import { useEffect, useState } from "react";
import { Link, BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import { Home } from "./components/Home";
import { Example } from "./components/Example";
import { GenerateMeme } from "./components/GenerateMeme";

import { Navbar, Container, Nav } from "react-bootstrap";

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
            <Nav.Link href="/:template_id">Create your Meme</Nav.Link>
            <Nav.Link href="/examples">Examples</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div>
        {/* display page */}
        <Switch>
          <Route path="/home">
            <Home memes={memes} />
          </Route>
          {/* dynamic route as it uses a param */}
          <Route path="/:template_id" exact>
            <GenerateMeme memes={memes} />
          </Route>
          <Route path="/examples">
            <Example />
          </Route>
          {/* redirect to the home page for the first render */}
          <Redirect to="/home" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
