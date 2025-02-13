const apiKey = "30fa6e17dff8fe90ffee79a3fcaf0175";
const apiUrlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;
const apiUrlLaunches = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR&page=1`;
const apiUrlTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1`;

const addedMovieIds = new Set(); // Conjunto para rastrear os filmes já adicionados

function getMovieDetails(movieId) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;
  return fetch(movieDetailsUrl).then((response) => response.json());
}

function addMovieToMainCarousel(carousel, movie, details, imageUrl) {
  const genres = details.genres.map((genre) => genre.name).join(" | ");
  const duration = details.runtime;
  const rating = details.vote_average;

  carousel.slick(
    "slickAdd",
    `<div class="filme">
      <div class="blur-background" style="background-image: url('${imageUrl}');"></div>
      <img src="${imageUrl}" alt="${movie.title}">
      <div class="filme-info">
        <h2>${movie.title}</h2>
        <h3>${movie.title}</h3>
        <p>${genres} - ${duration} min</p>
        <p> ${rating}</p>
      </div>
    </div>`
  );
}

function addMovieToSecondaryCarousel(carousel, movie, details, imageUrl) {
  const duration = details.runtime;
  const rating = details.vote_average;

  carousel.slick(
    "slickAdd",
    `<div class="subfilmes">
      <img src="${imageUrl}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>${duration} min</p>
        <p>${rating}</p>
    </div>`
  );
}

fetch(apiUrlPopular)
  .then((response) => response.json())
  .then((data) => {
    const carousel = $(".carousel");
    data.results.forEach((movie) => {
      if (!addedMovieIds.has(movie.id)) {
        addedMovieIds.add(movie.id);
        const imageUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
        
        getMovieDetails(movie.id).then((details) => {
          addMovieToMainCarousel(carousel, movie, details, imageUrl);
        });
      }
    });
  });

fetch(apiUrlLaunches)
  .then((response) => response.json())
  .then((data) => {
    const carousel = $(".launches-container");
    data.results.forEach((movie) => {
      if (!addedMovieIds.has(movie.id)) {
        addedMovieIds.add(movie.id);
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        
        getMovieDetails(movie.id).then((details) => {
          addMovieToSecondaryCarousel(carousel, movie, details, imageUrl);
        });
      }
    });
  });

fetch(apiUrlTopRated)
  .then((response) => response.json())
  .then((data) => {
    const carousel = $(".top-rated-container");
    data.results.forEach((movie) => {
      if (!addedMovieIds.has(movie.id)) {
        addedMovieIds.add(movie.id);
        const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        
        getMovieDetails(movie.id).then((details) => {
          addMovieToSecondaryCarousel(carousel, movie, details, imageUrl);
        });
      }
    });
  });