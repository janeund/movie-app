import "./css/style.css";
import "./css/reset.css";

const global = {
  currentPage: window.location.pathname,
  API_KEY: '005504cfb7e5160f459c7987f1017218',
  API_URL: 'https://api.themoviedb.org/3/'
}

// Fetch data from tmdb API
async function fetchAPIData(endpoint) {
  const res = await fetch(`${global.API_URL}${endpoint}?api_key=${global.API_KEY}&language=en-US`);
  const data = await res.json();
  return data;
}

// Display top rated movies on home page slider
async function displayTopMovies() {
  const { results } = await fetchAPIData('movie/top_rated');
  results.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('top-movies-card', 'card');
    card.innerHTML = 
    ` 
          <a href="movies.html?id=${movie.id}">
            <img class='slider-card-image' src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">${movie.release_date}</p>
          </div>
     
    `;
    document.querySelector('.top-movies-slider-container').appendChild(card);
  });
}

// Display top rated series on home page slider
async function displayTopSeries() {
  const { results } = await fetchAPIData('tv/top_rated');
  results.forEach(tv => {
    const card = document.createElement('div');
    card.classList.add('top-series-card', 'card');
    card.innerHTML = 
    ` 
          <a href="series.html?id=${tv.id}">
            <img class='slider-card-image' src="https://image.tmdb.org/t/p/w500/${tv.poster_path}" alt="${tv.name}">
          </a>
          <div class="card-body">
            <h5 class="card-title">${tv.name}</h5>
            <p class="card-text">${tv.first_air_date}</p>
          </div>
     
    `;
    document.querySelector('.top-series-slider-container').appendChild(card);
  });
}


// Highlight active navigation link
function hightlightActiveLink() {
  const links = document.querySelectorAll('.navigation-link');
  links.forEach(link => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active')
    }
  })
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayTopMovies();
      displayTopSeries();
      break;
    case '/movies.html':
      console.log('movies');
      break;
    case '/series.html':
      console.log('series');
      break;
    case '/people.html':
      console.log('people');
      break;
    case '/search.html':
      console.log('search');
      break;
  }

  hightlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init);