import { useParams } from "react-router-dom";

export const GenerateMeme = ({ memes }) => {
  // with image id passed as a parameter, it wil be displayed on this view
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

/**
 * 
useParams let use access route parameter easily
that you defined in your route itself
 * 
 */