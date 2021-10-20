import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";

import { Home } from './pages/Home';
import { GenerateMeme } from './pages/GenerateMeme';

function App() {
  const [memes, setMemes] = useState([])

  const fetchMemes = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const results = await response.json();
    
    if (results.success) {
      setMemes(results.data.memes)
    }
  }

  useEffect(() => {
    fetchMemes();
  }, [])

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home memes={memes} />
        </Route>
        <Route path="/:template_id" exact>
          <GenerateMeme memes={memes} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

