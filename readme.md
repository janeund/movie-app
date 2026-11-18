# MSB Movie App

MSB movie application is a platform to discover movies, TV-shows and celebrities. Project fetches data from external API [TMDB](https://www.themoviedb.org/) (version 3). Users can explore movies and TV-shows, learn about trending and top rated titles, look for any relevant query in search bar.

👉🏻 [Live Demo](https://movie-app-msb.netlify.app)

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Swiper.js Library
- The Movie DB API

## Features

- Fetching information about movies/series/people from external API
- Integrated Swiper sliders for cards showcases, with responsive slides per view
- Loading spinner for visualizing request in process
- Search box which accepts user input to be searched and then redirects to results page with pagination
- Responsive layout for mobile, tablet and desktop
- Mobile burger menu that drops down over the page (closes on link tap, outside tap or Esc)
- User reviews slider (1 / 2 / 3 cards depending on screen width); section is hidden when there are no reviews
- Actor filmography loads 10 titles at a time with a "Load more" button
- Expandable actor biography ("Read more" / "Read less"); short biographies are shown in full

## Future Improvements

- Add option to filter and sort content by selected parameters
- Load more / pagination for other long lists

## Start Locally

Clone repository

```bash
git clone https://github.com/janeund/movie-app
cd movie-app
```

Install dependencies

```bash
npm install
```

Start local server via Vite

```bash
npm run dev
```
