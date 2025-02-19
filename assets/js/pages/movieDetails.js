const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movieId');

function getMovieDetails(movieId) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;
  return fetch(movieDetailsUrl).then(response => response.json());
}

$(document).ready(function() {
  getMovieDetails(movieId).then(details => {
    const releaseYear = new Date(details.release_date).getFullYear();
    $('#movie-release-year').text(`(${releaseYear})`);
    $('#movie-title').text(details.title);
    $('#movie-poster').attr('src', `https://image.tmdb.org/t/p/w500${details.poster_path}`);
    $('#movie-genres').text(details.genres.map(genre => genre.name).join(" | "));
    $('#movie-duration').text(`${details.runtime} min`);
    $('#movie-rating').text(`${details.vote_average.toFixed(1)}/10`);
    $('#movie-overview').text(details.overview);
    $('#movie-release-date').text(details.release_date);
  }).catch(error => {
    console.error('Erro ao buscar detalhes do filme:', error);
  });
});