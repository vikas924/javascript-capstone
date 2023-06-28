import { fetchdata } from './fetchList.js';
import { involvmentUrl } from './config.js';

const addCommentForm = async () => {
  const form = `<form action="" class="form w-50" id="commentForm">
            <div class="form-group row justify-content-center">
              <div class="col-12">
                  <input name="name" id="user" class="p-2 input border border-2 border-black d-flex right_align w-100" placeholder="Your Name" type="text">
              </div>  
            </div>
            <br>
            <div class="form-group row justify-content-center">
              <div class="col-12">
                  <textarea rows="3" name="comment" id="comment" class="p-2 input border border-2 border-black d-flex right_align w-100" placeholder="Your Insights" type="text"></textarea>
              </div>  
            </div>
            <div class="form-group mt-3 row justify-content-start">
              <div class="col-12">
                  <button type="submit" class="btn btn-outline-primary btn-submit d-flex ">Comment</button>
              </div>
            </div>
          </form>`;
  document.getElementById('form').innerHTML = form;
};

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

export { addCommentForm, showComments };