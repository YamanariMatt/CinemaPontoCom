const apiKey = "30fa6e17dff8fe90ffee79a3fcaf0175";
const apiUrlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;
const apiUrlLaunches = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR&page=`;
const apiUrlTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1`;
const apiUrlTrending = `https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}&language=pt-BR&page=1`;
const apiUrlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=pt-BR&page=1`;
const apiUrlAction = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=28&language=pt-BR&page=1`;
const apiUrlComedy = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=35&language=pt-BR&page=1`;
const apiUrlDrama = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=18&language=pt-BR&page=1`;
const apiUrlClassic = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&primary_release_date.lte=2000-01-01&language=pt-BR&page=1`;
const apiUrlAnimation = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=16&language=pt-BR&page=1`;
const apiUrlHorror = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=27&language=pt-BR&page=1`;
const apiUrlSciFi = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=878&language=pt-BR&page=1`;
const apiUrlRomance = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=10749&language=pt-BR&page=1`;
const apiUrlDocumentary = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=99&language=pt-BR&page=1`;

const addedMovieIds = new Set();

function getMovieDetails(movieId) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;
  return fetch(movieDetailsUrl).then((response) => response.json());
}

function addMovieToMainCarousel(carousel, movie, details, imageUrl) {
  const genres = details.genres.map((genre) => genre.name).join(" | ");
  const duration = details.runtime;
  const rating = details.vote_average.toFixed(1);

  carousel.slick(
    "slickAdd",
    `<div class="filme">
      <div class="blur-background" style="background-image: url('${imageUrl}');"></div>
      <img src="${imageUrl}" alt="${movie.title}">
      <div class="filme-info">
        <h2>${movie.title}</h2>
        <h3>${movie.title}</h3>
        <p>${genres} - ${duration} min</p>
        <p> ${rating}/10</p>
      </div>
    </div>`
  );
}

function addMovieToSecondaryCarousel(carousel, movie, details, imageUrl) {
  const duration = details.runtime;
  const rating = details.vote_average.toFixed(1);

  carousel.slick(
    "slickAdd",
    `<div class="subfilmes">
      <img src="${imageUrl}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${duration} min | ${rating}/10</p>
    </div>`
  );
}

function fetchMovies(
  url,
  carouselSelector,
  addMovieFunction,
  useBackdrop = false,
  pages = 1
) {
  const carousel = $(carouselSelector);
  for (let page = 1; page <= pages; page++) {
    fetch(`${url}${page}`)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((movie) => {
          if (!addedMovieIds.has(movie.id)) {
            addedMovieIds.add(movie.id);
            const imageUrl =
              useBackdrop && movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            getMovieDetails(movie.id).then((details) => {
              addMovieFunction(carousel, movie, details, imageUrl);
            });
          }
        });
      });
  }
}


fetchMovies(apiUrlPopular, ".carousel", addMovieToMainCarousel, true);
fetchMovies(apiUrlLaunches,".launches-container",addMovieToSecondaryCarousel,false,3); 
fetchMovies(apiUrlTopRated,".top-rated-container",addMovieToSecondaryCarousel);
fetchMovies(apiUrlTrending, ".trending-container", addMovieToSecondaryCarousel);
fetchMovies(apiUrlUpcoming, ".upcoming-container", addMovieToSecondaryCarousel);
fetchMovies(apiUrlAction, ".action-container", addMovieToSecondaryCarousel);
fetchMovies(apiUrlComedy, ".comedy-container", addMovieToSecondaryCarousel);
fetchMovies(apiUrlDrama, ".drama-container", addMovieToSecondaryCarousel);
fetchMovies(apiUrlClassic, ".classic-container", addMovieToSecondaryCarousel);
fetchMovies(apiUrlAnimation,".animation-container",addMovieToSecondaryCarousel);
fetchMovies(apiUrlHorror, ".horror-container", addMovieToSecondaryCarousel);
fetchMovies(apiUrlSciFi, ".scifi-container", addMovieToSecondaryCarousel);
fetchMovies(apiUrlRomance, ".romance-container", addMovieToSecondaryCarousel);
fetchMovies(apiUrlDocumentary,".documentary-container",addMovieToSecondaryCarousel);
