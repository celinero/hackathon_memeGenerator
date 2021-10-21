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

  // fetch data on parent to be available to his children: Home and GenerateMeme
  const fetchMemes = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const results = await response.json();
    
    if (results.success) {
      setMemes(results.data.memes)
    }
  }

  // fetch after mount (componentDidMount)
  // because the component cannot have a async render
  // need to render first, then to update its internal state with the result of api call
  useEffect(() => {
    fetchMemes();
  }, [])

  return (

    
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Home memes={memes} />
        </Route>
        {/* dynamic route as it uses a param */}
        <Route path="/:template_id" exact>
          <GenerateMeme memes={memes} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

