import { useState } from "react";

export const FormMemeGenerator = ({ memes }) => {
  // destructuring by passing the info into the state
  const [topText, setTopText] = useState("");

  const [bottomText, setBottomText] = useState("");

  const [template, setTemplate] = useState(null);

  return (
    <div>
      <form onSubmit={async(event) => event.preventDefault()}>

        {/* logic for create custom meme from api */}
        const params = {
            template_id: template.id,
            text0: topText,
            text1: bottomText,
            username: 'imgflip_hubot',
            password: 'imgflip_hubot'
        };
        const response = await fetch('https://api.imgflip.com/caption_image', {
                body: JSON.stringify(params)
        })

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
        {/* button for create a custom meme */}
        <button type="submit">Create Meme</button>
      </form>
    </div>
  );
};
