import { Link } from "react-router-dom";


export const Home = ({ memes }) => {
  return (
    <div>
      <h1>Meme Generator</h1>
      <h2>Gallery</h2>
      {/* each image is a link via its id, if we click on it, it will be redirected to GenerateMeme view */}
      {memes.map(meme => (
        <Link key={meme.id} to={`/${meme.id}`}>
          <img src={meme.url} style={{ width: '100px'}} />
          {meme.name}
        </Link>
      ))}
    </div>
  )
}