const urlParams = new URLSearchParams(window.location.search);
const actorId = urlParams.get("actorId");

function getActorDetails(actorId) {
  const actorDetailsUrl = `https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}&language=pt-BR`;
  return fetch(actorDetailsUrl).then((response) => response.json());
}

function getActorMovies(actorId) {
  const actorMoviesUrl = `https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}&language=pt-BR`;
  return fetch(actorMoviesUrl).then((response) => response.json());
}

$(document).ready(function () {
  getActorDetails(actorId)
    .then((actorDetails) => {
      $("#actor-photo").attr("src", `https://image.tmdb.org/t/p/w200${actorDetails.profile_path}`);
      $("#actor-name").text(actorDetails.name);
      $("#actor-bio").text(actorDetails.biography);

      return getActorMovies(actorId);
    })
    .then((movieCredits) => {
      const moviesList = $("#actor-movies-list");
      movieCredits.cast.forEach((movie) => {
        moviesList.append(`<li>${movie.title} (${new Date(movie.release_date).getFullYear()})</li>`);
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar detalhes do ator:", error);
    });
});