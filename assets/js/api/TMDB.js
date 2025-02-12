const apiKey = "30fa6e17dff8fe90ffee79a3fcaf0175";
const apiUrlPopular = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;
const apiUrlLaunches =`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=pt-BR&page=1`;
const apiUrlTopRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=pt-BR&page=1`;

function getMovieDetails(movieId) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;
  return fetch(movieDetailsUrl).then((response) => response.json());
}

fetch(apiUrlPopular)
  .then((response) => response.json())
  .then((data) => {
    const carousel = $(".carousel");
    data.results.forEach((movie) => {
      const imageUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
      
      getMovieDetails(movie.id).then((details) => {
        const genres = details.genres.map((genre) => genre.name).join(" | ");
        const duration = details.runtime;
        const rating = details.vote_average;

        carousel.slick(
          "slickAdd",
          `<div class="filme">
            <div class="blur-background" style="background-image: url('${imageUrl}');"></div>
            <img src="${imageUrl}" alt="${movie.title}">
            <div class="filme-info">
              <h2>Destaques</h2>
              <h3>${movie.title}</h3>
              <p>${genres} - ${duration} min</p>
              <p> ${rating}</p>
            </div>
          </div>`
        );
      });
    });
  });

  fetch(apiUrlLaunches)
  .then((response) => response.json())
  .then((data) => {
    const carousel = $(".launches-container");
    data.results.forEach((movie) => {
      const imageUrl = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
      
      getMovieDetails(movie.id).then((details) => {
        const genres = details.genres.map((genre) => genre.name).join(" | ");
        const duration = details.runtime;
        const rating = details.vote_average;

        carousel.slick(
          "slickAdd",
          `<div class="launches-movies" >
            <div class="blur-background" style="background-image: url('${imageUrl}');"></div>
            <img src="${imageUrl}" alt="${movie.title}">
            <p>${movie.title}</p>
          </div>`
        );
      });
    });
  });

  fetch(apiUrlPopular)
  .then((response) => response.json())
  .then((data) => {
    const carousel = $(".top-rated-container");
    data.results.forEach((movie) => {
      const imageUrl = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
      
      getMovieDetails(movie.id).then((details) => {
        const genres = details.genres.map((genre) => genre.name).join(" | ");
        const duration = details.runtime;
        const rating = details.vote_average;

        carousel.slick(
          "slickAdd",
          `<div class="launches-movies" >
            <div class="blur-background" style="background-image: url('${imageUrl}');"></div>
            <img src="${imageUrl}" alt="${movie.title}">
            <p>${movie.title}</p>
          </div>`
        );
      });
    });
  });
