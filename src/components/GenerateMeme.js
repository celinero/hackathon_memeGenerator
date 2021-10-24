import { useParams } from "react-router-dom";

import { FormMemeGenerator } from "./FormMemeGenerator";

export const GenerateMeme = ({ memes }) => {
  // with image id passed as a parameter, it wil be displayed on this view
  const { template_id } = useParams();

  // memes is not available in first render so meme can be undefined
  // to avoid breaking, add empty object
  const meme = memes.find((m) => m.id === template_id) || {};

  return (
    <div className='containerStyle' style={{ padding: '0 20px'}}>
      <h1 className='wordStyle' style={{textAlign: "center"}}>Meme Generator</h1>
      <br />
      <h2 style={{ margin: " 5px", textAlign: "center" }}>
        Create your own meme!
      </h2>
      <br />
      <div style={{ textAlign: "center" }}>{meme.name}</div>

      <div
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      >
        {meme.url && (
          <img
            src={meme.url}
            style={{
              width: "300px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
            alt={"meme"}
          />
        )}
      </div>
      <br />
      {/* add props meme for the template_id */}
      <div
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      >
        <FormMemeGenerator meme={meme} />
      </div>
    </div>
  );
};

/**
 * 
useParams let use access route parameter easily
that you defined in your route itself
 * 
 */
