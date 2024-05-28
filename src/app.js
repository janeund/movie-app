import "./css/style.css";
import "./css/reset.css";

const global = {
  currentPage: window.location.pathname,
  API_KEY: '005504cfb7e5160f459c7987f1017218'
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      console.log('home');
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
}

document.addEventListener('DOMContentLoaded', init);