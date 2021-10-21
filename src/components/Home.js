import { Link } from "react-router-dom";

export const Home = ({ memes }) => {
  return (
    <div>
      <h1>Meme Generator</h1>
      <h2>Gallery</h2>
      {memes.map((meme) => (
        <Link key={meme.id} to={`/${meme.id}`}>
          <img src={meme.url} style={{ width: "100px" }} alt={"meme"} />
          {meme.name}
        </Link>
      ))}
    </div>
  );
};
