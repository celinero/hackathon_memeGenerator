import { useParams } from "react-router-dom";

import { FormMemeGenerator } from "./FormMemeGenerator";

export const GenerateMeme = ({ memes }) => {
  // with image id passed as a parameter, it wil be displayed on this view
  const { template_id } = useParams();

  // memes is not available in first render so meme can be undefined
  // to avoid breaking, add empty object
  const meme = memes.find((m) => m.id === template_id) || {};

  return (
    <div>
      <h1>Meme Generator</h1>
      <h2>Create your own meme!</h2>
      <img src={meme.url} style={{ width: "300px" }} alt={"meme"} />
      <br />
      {meme.name}
      {/* add props meme for the template_id */}
      <FormMemeGenerator meme={meme} />
    </div>
  );
};

/**
 * 
useParams let use access route parameter easily
that you defined in your route itself
 * 
 */
