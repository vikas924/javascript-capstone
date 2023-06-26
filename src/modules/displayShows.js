import fetchShows from './fetchList.js';
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
};

export default displayShows;