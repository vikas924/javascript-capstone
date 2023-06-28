const showsCounter = () => {
  const divElement = document.getElementById('showsList');
  const childCount = divElement.childElementCount;

  return childCount; 

};

export default showsCounter;
