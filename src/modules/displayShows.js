import { fetchShows, fetchdata } from './fetchList.js';
import { baseUrl, involvmentUrl } from './config.js';
import { fetchLikes, storeLike } from './likesController.js';
import showsCounter from './showsCounter.js';
import { addCommentForm, showComments } from './commentform.js';
import postData from './postdata.js';
import commentsCounter from './commentcounter.js';

const displayShows = async () => {
  const showList = document.getElementById('showsList');
  const res = await fetchShows(baseUrl);
  let html = '';
  res.forEach((item) => {
    html += `<div class="col-md-3 mt-5">
                      <div class="card" >
                        <img src="${item.image.medium}" class="card-img-top" alt="Image">
                        <div class="card-body">
                          
                          <div class="d-flex justify-content-between align-items-center">
                              <h5 class="card-title">${item.name}</h5>
                              <i class="fa-regular fa-heart likes" data-id="${item.id}" data-liked="false"></i>
                          </div>
                          
                          <div class="row mt-2">
                              <div class="col-md-12"><span class="d-flex justify-content-end" id="likesCounter${item.id}"><span id="counter${item.id}">0 </span> Likes</span></div>
                          </div>
                          <div class="row mt-2">
                              <div class="col-md-12"><button class="btn btn-dark w-100 comments" data-showId="${item.id}" >Comments</button></div>
                          </div>
                        </div>
                       </div>
                     </div>`;
  });
  showList.innerHTML = html;
  let showCount = 0;
  showCount = showsCounter(res);
  document.getElementById('show_conter').innerHTML = `(${showCount})`;
  const likesRes = await fetchLikes(involvmentUrl);
  if (Array.isArray(likesRes)) {
    likesRes.forEach((item) => {
      const element = document.getElementById(`counter${item.item_id}`);
      element.textContent = item.likes;
      const parentCardElement = element.parentElement.parentElement.parentElement.parentElement;
      const likesElement = parentCardElement.querySelector('.likes');
      likesElement.classList.remove('fa-regular');
      likesElement.classList.add('fa-solid');
      likesElement.classList.add('text-danger');
      likesElement.setAttribute('data-liked', 'true');
    });
  }

  const likesclick = document.querySelectorAll('.likes');
  likesclick.forEach((likesclick) => {
    likesclick.addEventListener('click', async (event) => {
      const { target } = event;
      const showId = target.getAttribute('data-id');
      const counter = document.getElementById(`counter${showId}`);

      target.classList.remove('fa-regular');
      target.classList.add('fa-solid');
      target.classList.add('text-danger');
      target.setAttribute('data-liked', 'true');
      counter.textContent = parseInt(counter.textContent, 10) + 1;
      await storeLike(involvmentUrl, showId);
    });
  });

  const commentElement = document.querySelector('#commentsCounter');

  const commentsbutton = document.querySelectorAll('.comments');
  commentsbutton.forEach((comments) => comments.addEventListener('click', async (event) => {
    const modal = document.getElementById('Modal');
    const Id = event.target.getAttribute('data-showid');
    const showdata = await fetchdata(`${baseUrl}/${Id}`);
    const seasons = await fetchdata(`${baseUrl}/${Id}/seasons`);
    let genrehtml = '';
    showdata.genres.forEach((genre, index) => {
      if ((index + 1) !== showdata.genres.length) {
        genrehtml += `${genre},`;
      } else if ((index + 1) === showdata.genres.length) {
        genrehtml += `${genre}.`;
      }
    });
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'block';
    document.body.classList.add('modal-open');

    document.getElementById('showImage').setAttribute('src', showdata.image.medium);
    document.getElementById('showTitle').innerHTML = showdata.name;
    document.getElementById('showLang').innerHTML = `Language: ${showdata.language}`;
    document.getElementById('showType').innerHTML = `Type: ${showdata.type}`;
    document.getElementById('showPremiered').innerHTML = `Genre: ${genrehtml}`;
    document.getElementById('showEnd').innerHTML = `Seasons: ${seasons.length}`;

    addCommentForm();
    await showComments(Id);

    let commentCounter = '';
    commentCounter = commentsCounter();
    commentElement.innerHTML = commentCounter;

    const form = document.querySelector('.form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const user = document.querySelector('#user').value.trim();
      const Comments = document.querySelector('#comment').value.trim();
      if ((user.length !== 0) && (Comments.length !== 0)) {
        const data = {
          item_id: Id,
          username: user,
          comment: Comments,
        };
        await postData(`${involvmentUrl}comments`, data);
        await showComments(Id);
        commentCounter = commentsCounter();
        commentElement.innerHTML = commentCounter;
        document.getElementById('user').value = '';
        document.getElementById('comment').value = '';
      }
    });
  }));

  const modalclose = document.querySelector('#closeIcon');
  modalclose.addEventListener('click', () => {
    const modal = document.getElementById('Modal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
    const commentlist = document.querySelector('#commentList');
    commentlist.innerHTML = '';
    commentElement.innerHTML = '';
  });
};

export default displayShows;