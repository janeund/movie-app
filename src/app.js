import "./css/style.css";
import "./css/reset.css";

// function addImage(container) {
//   const img = document.createElement('img');
//   img.src = userIcon;
//   document.querySelector(container).appendChild(img);
// }

const global = {
  currentPage: window.location.pathname,
  API_KEY: '005504cfb7e5160f459c7987f1017218',
  API_URL: 'https://api.themoviedb.org/3/',
  movieID: window.location.search.split('=')[1],
  showID: window.location.search.split('=')[1],
  personID: window.location.search.split('=')[1],
}

// Fetch data from tmdb API
async function fetchAPIData(endpoint) {
  showLoader();
  const res = await fetch(`${global.API_URL}${endpoint}?api_key=${global.API_KEY}&language=en-US`);
  const data = await res.json();
  hideLoader();
  return data;
}

// Display hero slider
async function displayHeroSlider() {
  // const imageUrl = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
  const { results } = await fetchAPIData('trending/all/week');
  const { genres } = await fetchAPIData('genre/tv/list');
  // console.log(genres);
  
  results.slice(0, 1).forEach(item => {
    const div = document.createElement('div');
    div.classList.add('trending-item');
    div.innerHTML = `
    <div class="trending-image-container">
      <img class="trending-item-img" src="https://image.tmdb.org/t/p/original/${item.backdrop_path}">
    </div>
    <div class="hero-item-content">
      <h2 class="hero-item-title">${item.title}</h2>
      <ul class="details-facts">
        <li class="details-date">${item.release_date}</li>
        <li class="details-vote">
          <i class="fa-solid fa-star"></i>
          <div class="rating">${item.vote_average.toFixed(1)} / 10 </div>
          <div class="vote-total">(${(item.vote_count / 1000).toFixed(1)}k)</div>
        </li>
        <li class="genres-hero">
          <div class="details-genres">
            <ul class="genres">
              ${ console.log()
              }
            </ul>
          </div>
        </li>
      </ul>
      <p class="hero-item-overview">${item.overview}</p>
      <div class="learn-more-btn">
        <a class="btn more-btn" href="movie-details.html?id=${item.id}">Learn More</a>
      </div>
      
    </div>
    `;
    document.querySelector('.hero-slider').appendChild(div);
  });
  // initHeroSlider();
}

// Display top rated movies on home page slider
async function displayTopMovies() {
  const { results } = await fetchAPIData('movie/top_rated');
  results.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('top-movies-card', 'card');
    card.innerHTML = ` 
    <a href="movie-details.html?id=${movie.id}">
      <img class='slider-card-image' src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">${movie.release_date}</p>
    </div>`;
    document.querySelector('.top-movies-slider-container').appendChild(card);
  });
}

// Display top rated series on home page slider
async function displayTopSeries() {
  const { results } = await fetchAPIData('tv/top_rated');
  results.forEach(tv => {
    const card = document.createElement('div');
    card.classList.add('top-series-card', 'card');
    card.innerHTML = ` 
    <a href="show-details.html?id=${tv.id}">
      <img class='slider-card-image' src="https://image.tmdb.org/t/p/w500/${tv.poster_path}" alt="${tv.name}">
    </a>
    <div class="card-body">
      <h5 class="card-title">${tv.name}</h5>
      <p class="card-text">${tv.first_air_date}</p>
    </div>`;
    document.querySelector('.top-series-slider-container').appendChild(card);
  });
}

// Display popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');
  results.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('popular-movie-card', 'card');
    card.innerHTML = `
        <a href="movie-details.html?id=${movie.id}">
          <img class='popular-card-image' src="https://image.tmdb.org/t/p/w500/${movie.poster_path}"
            alt="${movie.title}">
        </a>
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">${movie.release_date}</p>
        </div>`;
    document.querySelector('.popular-movies-wrapper').appendChild(card);
  });
}

// Display movie details
async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieID}`);
  displayOverlayImage('movie', movie.backdrop_path)
  const movieInner = document.createElement('div');
  movieInner.innerHTML = `
  <div class="details-top">
    <div class="details-poster">
      <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
    </div>
    <div class="details-info">
      <h3 class="details-title-main">${movie.title}</h3>
      <ul class="details-facts">
        <li class="details-date">${movie.release_date.slice(0, 4)}</li>
        <li class="details-vote">
          <i class="fa-solid fa-star"></i>
          <div class="rating">${movie.vote_average.toFixed(1)} / 10 </div>
          <div class="vote-total">(${(movie.vote_count / 1000).toFixed(1)}k)</div>
        </li>
        <li class="details-runtime">${minToHours(movie.runtime)}</li>
      </ul>
      <div class="details-tagline">${movie.tagline}</div>
      <div class="details-overview">
        <h4 class="details-title-secondary">Overview</h4>
        <p class="details-overview-text">${movie.overview}</p>
      </div>
    <div class="details-genres">
      <h4 class="details-title-secondary">Genres</h4>
      <ul class="genres">
      ${movie.genres.map(genre => `<li class="genre">${genre.name}</li>`).join('')}
      </ul>
    </div>
    </div>
  </div>`;
  document.querySelector('.movie-details').appendChild(movieInner);
}

// Display movie actors cast
async function displayMovieCast() {
  const movieID = window.location.search.split('=')[1];
  const { cast } = await fetchAPIData(`movie/${movieID}/credits`);
  const actors = cast.filter(actor => actor.known_for_department === 'Acting').slice(0, 10);
  actors.forEach(actor => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <a href="person-details.html?id=${actor.id}">
        <img class='slider-card-image' src="https://image.tmdb.org/t/p/w500/${actor.profile_path}" alt="${actor.name}">
      </a>
      <div class="card-body">
        <h5 class="card-title">${actor.name}</h5>
        <p class="card-text">${actor.character}</p>
      </div>`;
  document.querySelector('.details-cast').appendChild(card);
  });
}

// Display movie reviews
async function displayMovieReviews() {
  const { results } = await fetchAPIData(`movie/${global.movieID}/reviews`);
  results.forEach(review => {
    const card = document.createElement('div');
    card.classList.add('review-card');
    card.innerHTML = `
        <div class="review-card-header">
          <div class="review-card-avatar">
          ${
            review.author_details.avatar_path 
            ? `<img class="review-image" src="https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}" alt="${review.author_details.username}">`
            : `<i class="fa-regular fa-user"></i>`
          }
          </div>
          <div class="review-card-username">Review by <span>${review.author_details.username}</span></div>
        </div>
        <div class="review-card-main">
          <p class="review-card-text">${review.content.slice(0, 50)}</p>
        </div>
        <div class="review-card-footer">
          <div class="review-card-rating">
            <i class="fa-solid fa-star"></i>
            ${ 
              review.author_details.rating 
              ? `${review.author_details.rating} / 10` 
              : `<div></div>`
            }
          </div>
          <div class="review-date">${new Date(review.created_at).toLocaleDateString('en-US')}</div>
        </div>`;
      document.querySelector('.reviews-container').appendChild(card);
  })
}

// Display popular shows
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');
  results.forEach(show => {
    const card = document.createElement('div');
    card.classList.add('popular-show-card', 'card');
    card.innerHTML = `
        <a href="show-details.html?id=${show.id}">
          <img class='popular-card-image' src="https://image.tmdb.org/t/p/w500/${show.poster_path}"
            alt="${show.name}">
        </a>
        <div class="card-body">
          <h5 class="card-title">${show.name}</h5>
          <p class="card-text">${show.first_air_date}</p>
        </div>`;
    document.querySelector('.popular-shows-wrapper').appendChild(card);
  });
}


// Display show details
async function displayShowDetails() {
  const showID = window.location.search.split('=')[1];
  const show = await fetchAPIData(`tv/${showID}`);
  displayOverlayImage('show', show.backdrop_path)
  const showInner = document.createElement('div');
  showInner.innerHTML = `
  <div class="details-top">
    <div class="details-poster">
      <img src="https://image.tmdb.org/t/p/w500/${show.poster_path}" alt="${show.name}">
    </div>
    <div class="details-info">
      <h3 class="details-title-main">${show.name}</h3>
      <ul class="details-facts">
        <li class="details-date">${show.first_air_date.slice(0, 4)}</li>
        <li class="details-vote">
          <i class="fa-solid fa-star"></i>
          <div class="rating">${show.vote_average.toFixed(1)} / 10 </div>
          <div class="vote-total">(${(show.vote_count / 1000).toFixed(1)}k)</div>
        </li>
        <li class="details-runtime"></li>
      </ul>
      <div class="details-tagline">${show.tagline}</div>
      <div class="details-overview">
        <h4 class="details-title-secondary">Overview</h4>
        <p class="details-overview-text">${show.overview}</p>
      </div>
    <div class="details-genres">
      <h4 class="details-title-secondary">Genres</h4>
      <ul class="genres">
      ${show.genres.map(genre => `<li class="genre">${genre.name}</li>`).join('')}
      </ul>
    </div>
    </div>
  </div>`;
  document.querySelector('.show-details').appendChild(showInner);
}

// Display show actors cast
async function displayShowCast() {
  const showID = window.location.search.split('=')[1];
  const { cast } = await fetchAPIData(`tv/${showID}/credits`);
  const actors = cast.filter(actor => actor.known_for_department === 'Acting').slice(0, 10);
  if (actors.length !== 0) {
    actors.forEach(actor => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <a href="person-details.html?id=${actor.id}">
          <img class='slider-card-image' src="https://image.tmdb.org/t/p/w500/${actor.profile_path}" alt="${actor.name}">
        </a>
        <div class="card-body">
          <h5 class="card-title">${actor.name}</h5>
          <p class="card-text">${actor.character}</p>
        </div>`;
    document.querySelector('.details-cast').appendChild(card);
    });
  } else {
    document.querySelector('.show-cast').style.display = 'none';
  }
}

// Display show reviews
async function displayShowReviews() {
  const { results } = await fetchAPIData(`tv/${global.showID}/reviews`);
  if (results.length !== 0) {
     results.forEach(review => {
    const card = document.createElement('div');
    card.classList.add('review-card');
    card.innerHTML = `
        <div class="review-card-header">
          <div class="review-card-avatar">
          ${
            review.author_details.avatar_path 
            ? `<img class="review-image" src="https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}" alt="${review.author_details.username}">`
            : `<i class="fa-regular fa-user"></i>`
          }
          </div>
          <div class="review-card-username">Review by <span>${review.author_details.username}</span></div>
        </div>
        <div class="review-card-main">
          <p class="review-card-text">${review.content.slice(0, 50)}</p>
        </div>
        <div class="review-card-footer">
          <div class="review-card-rating">
            <i class="fa-solid fa-star"></i>
            ${ 
              review.author_details.rating 
              ? `${review.author_details.rating} / 10` 
              : `<div></div>`
            }
          </div>
          <div class="review-date">${new Date(review.created_at).toLocaleDateString('en-US')}</div>
        </div>`;
      document.querySelector('.reviews-container').appendChild(card);
  })
  } else {
    document.querySelector('.details-reviews').style.display = 'none';
  }
 
}

// Display popular people
async function displayPopularPeople() {
  const { results } = await fetchAPIData('person/popular');
  results.forEach(person => {
    const card = document.createElement('div');
    card.classList.add('popular-person-card', 'card');
    card.innerHTML = `
        <a href="person-details.html?id=${person.id}">
          <img class='popular-card-image' src="https://image.tmdb.org/t/p/w500/${person.profile_path}"
            alt="${person.name}">
        </a>
        <div class="card-body">
          <h5 class="card-title">${person.name}</h5>
          <p class="card-text">${person.known_for_department}</p>
        </div>`;
    document.querySelector('.popular-people-wrapper').appendChild(card);
  });
}

// Display person details
async function displayPersonDetails() {
  const personID = window.location.search.split('=')[1];
  const person = await fetchAPIData(`person/${personID}`);
  // displayOverlayImage('person', person.backdrop_path)
  const personInner = document.createElement('div');
  personInner.innerHTML = `
  <div class="details-top">
    <div class="details-poster">
      <img src="https://image.tmdb.org/t/p/w500/${person.profile_path}" alt="${person.name}">
    </div>
    <div class="details-info">
      <h3 class="details-title-main">${person.name}</h3>
      <ul class="details-facts">
        <li class="details-department">
        ${person.known_for_department}
        </li>
      </ul>
      <div class="details-overview">
        <h4 class="details-title-secondary">Biography</h4>
        <p class="details-overview-text">${person.biography}</p>
      </div>
    <div class="details-genres">
      <h4 class="details-title-secondary">Genres</h4>
      <ul class="genres"> 
      </ul>
    </div>
    </div>
  </div>`;
  document.querySelector('.person-details').appendChild(personInner);
}

// Display person images on person details page
async function displayPersonImages() {
  const { profiles } = await fetchAPIData(`person/${global.personID}/images`);
  console.log(profiles);
  profiles.forEach(image => {
    const card = document.createElement('div');
    card.classList.add('photo');
    card.innerHTML = `
      <img class='slider-card-image' src="https://image.tmdb.org/t/p/w500/${image.file_path}" alt="profile">`;
    document.querySelector('.photos-container').appendChild(card);
  })
}

// Display person credits on person details page
async function displayPersonCredits() {
  const { cast } = await fetchAPIData(`person/${global.personID}/combined_credits`);
  cast.forEach(credit => {
    if (credit.title) {
      const card = document.createElement('li');
    card.classList.add('credits-item');
    card.innerHTML = `
              <div class="credit-poster">
              ${
                credit.poster_path 
                ? `<img src="https://image.tmdb.org/t/p/w500/${credit.poster_path}" alt="${credit.title}">`
                : `<div class='no-image'>No image</div>`
              }
              </div>
              <div class="credit-info">
                <div class="credits-item-top">
                  <h4 class="credits-item-title">${credit.title}</h4>
                  <p class="credits-item-date">
                  ${
                    credit.release_date
                    ? credit.release_date.slice(0, 4)
                    : ''
                  }
                  </p>
                </div>
                <div class="credits-facts">
                  ${
                    credit.vote_average
                    ? `
                    <div class="credits-vote">
                      <i class="fa-solid fa-star"></i>
                      <div class="rating">${credit.vote_average}</div>
                    </div>`
                    : ''
                  }
                  <div class="credits-character">
                  ${credit.character}
                  </div>
                </div>
              </div>
           `;
    document.querySelector('.credits-list').appendChild(card);
    }
  })
}

// Convert total minutes to hours with minutes reminder
function minToHours(data) {
  const hours = Math.floor(data / 60);
  console.log(data);
  const min = data % 60; 
  return `${hours}h ${min}min`;
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

// Init hero slideshow
function initHeroSlider() {
  let slideIndex = 0;
  showSlides();
  function showSlides() {
    let slides = document.querySelectorAll('.trending-item');
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = 'none';
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000)
  }
  
}

// Show loader while loading api data
function showLoader() {
  document.querySelector('.loader-overlay').classList.add('show');
}

// Hide loader after api data is loaded
function hideLoader() {
  document.querySelector('.loader-overlay').classList.remove('show'); 
}

// Display overlay image for movies/shows details pages
function displayOverlayImage(type, overlayPath) {
  const overlay = document.createElement('div');
  overlay.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${overlayPath})`;
  overlay.classList.add('details-overlay-image');
  if (type === 'movie') {
    document.querySelector('.movie-details').appendChild(overlay);
  } else if (type === 'show') {
    document.querySelector('.show-details').appendChild(overlay);
  } else if (type === 'person') {
    document.querySelector('.person-details').appendChild(overlay);
  }
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayHeroSlider();
      displayTopMovies();
      displayTopSeries();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      displayMovieCast();
      displayMovieReviews();
      break;
    case '/movies.html':
      displayPopularMovies();
      break;
    case '/show-details.html':
      displayShowDetails();
      displayShowCast();
      displayShowReviews();
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/people.html':
      displayPopularPeople();
      break;
    case '/person-details.html':
      displayPersonDetails();
      displayPersonImages();
      displayPersonCredits();
      break;
    case '/search.html':
      console.log('search');
      break;
  }

  hightlightActiveLink()
}

document.addEventListener('DOMContentLoaded', init);