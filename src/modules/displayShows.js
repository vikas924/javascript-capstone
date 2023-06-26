import fetchShows from './fetchList.js';
import { baseUrl, involvmentUrl } from './config.js';
import fetchLikes from './likesController.js';

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
};

export default displayShows;