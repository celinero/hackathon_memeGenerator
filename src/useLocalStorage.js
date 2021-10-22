  export const getFromStorage = () => {
  return JSON.parse(localStorage.getItem('MEME')) || [];
}

export const addToStorage = (meme) => {
  const newValue = [meme, ...getFromStorage()];
  localStorage.setItem('MEME', JSON.stringify(newValue));
}