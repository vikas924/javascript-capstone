import { fetchdata } from './fetchList.js';
import { involvmentUrl } from './config.js';

const showComments = async (Id) => {
  const commentlist = document.querySelector('#commentList');
  let html = '';
  const commentdata = await fetchdata(`${involvmentUrl}comments?item_id=${Id}`);
  if (Array.isArray(commentdata)) {
    commentdata.forEach((_, index) => {
      const length = commentdata.length - 1;
      const updateid = length - index;
      html += `<p class = "bold-text text-center usercomments">${commentdata[updateid].creation_date} ${commentdata[updateid].username} ${commentdata[updateid].comment}</p>`;
    });
  } else {
    html = '';
  }
  commentlist.innerHTML = html;
};

export default showComments;