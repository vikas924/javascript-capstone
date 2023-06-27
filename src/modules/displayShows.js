import { fetchShows, fetchdata } from './fetchList.js';
import { baseUrl } from './config.js';

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
  }));

  const modalclose = document.querySelector('#closeIcon');
  modalclose.addEventListener('click', () => {
    const modal = document.getElementById('Modal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'false');
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  });
};

export default displayShows;