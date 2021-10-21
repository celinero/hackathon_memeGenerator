import { useState } from "react";

export const FormMemeGenerator = ({ meme }) => {
  // destructuring by passing the info into the state
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  // delete const template.id
  // create a new variable for the custom meme
  const [finalMeme, setFinalMeme] = useState(null)


  return (
    <div>
      <form onSubmit={async(event) => {
        event.preventDefault()
        // logic for create custom meme from api 
        // move the const params and headers up
        const params = {
          template_id: meme.id,
          text0: topText,
          text1: bottomText,
          // update login as the one provided didn't work
          username: process.env.REACT_APP_IMGFLIP_USERNAME,
          password: process.env.REACT_APP_IMGFLIP_PASSWORD
        };

        
        const response = await fetch('https://api.imgflip.com/caption_image', {
          // stringify didn't work, replace by params
          body: new URLSearchParams(params).toString(),
          // modify to POST instead of GET
          method: 'POST',
          // add headers
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        });

        const result = await response.json()
        setFinalMeme(result.data.url)
        
      }}>
        {/* create a input for up text and it functionality */}
        <input
          placeholder="top text"
          value={topText}
          onChange={(e) => setTopText(e.target.value)}
        ></input>
        {/* create a input for bottom text and it functionality */}
        <input
          placeholder="bottom text"
          value={bottomText}
          onChange={(e) => setBottomText(e.target.value)}
        ></input>
        {/* button to create a custom meme */}
        <button type="submit">Create Meme</button>
      </form>

      // render the custom meme
      {finalMeme && <img src={finalMeme} alt="custom meme"/>}


    </div>
  );
};
