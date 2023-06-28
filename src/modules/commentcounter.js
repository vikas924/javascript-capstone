const commentsCounter = () => {
  const commentelement = document.querySelectorAll('.usercomments');
  const count = commentelement.length;
  return count;
};

export default commentsCounter;