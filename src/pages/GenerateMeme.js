import { useParams } from "react-router-dom";

export const GenerateMeme = ({ memes }) => {
  const { template_id } = useParams();

  const meme = memes.find(m => m.id === template_id)

  return (
    <div>
       <h1>Meme Generator</h1>
      <h2>Create your own meme!</h2>
      <img src={meme.url} style={{ width: '300px'}} />
      {meme.name}
    </div>
  )
}