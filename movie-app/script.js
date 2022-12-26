const APIKEY = 
  "04c35731a5ee918f014970082a0088b1";
const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = 
  "https://image.tmdb.org/t/p/w1280/";
const APISEARCHMOVIE = 
  "http://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const row = document.querySelector(".row");
const form = document.getElementById('form');
const input = document.getElementById('input');
const searchBtn = document.querySelector('.searchBtn');

getMovie(APIURL);

async function getMovie(api) {
  const resp = await fetch(api);
  console.log(resp);
  const respData = await resp.json();
  console.log(respData);
  const listMovie = respData.results;
  console.log(listMovie);

  listMovie.forEach((movie) => {
    const { title, vote_average, poster_path, overview} = movie;

    const column = document.createElement("div");
    column.classList.add("movie");
    column.classList.add("col");
    column.classList.add("l-3");
    column.classList.add("m-4");
    column.classList.add("c-6");

    column.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt="${title}" class="imgMovie">
        <div class="desc">
            <div class="desc_title">${title}</div>
            <span class="desc_rating ${setColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
          <h3>OverView:</h3>
          <span>${overview}</span>
        </div>
        `;
    row.appendChild(column);
  });
}

function setColor(rating) {
  let result = '';
  if (rating >= 8) {
    result = "yellow";
  } else if (rating < 8 && rating > 5) {
    result = "green";
  } else {
    result = "red";
  }
  return result;
}

searchBtn.addEventListener('click', () => {
  const searchMovie = input.value;
  console.log(searchMovie);
  if (searchMovie) {
    console.log(1);
    row.innerHTML = "";
    getMovie(APISEARCHMOVIE+searchMovie);
  } else {
    alert("The movie is not exist. Welcome!");
    getMovie(APIURL);
  }
  input.value = "";
})


