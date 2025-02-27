const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get("movieId");

function getMovieDetails(movieId) {
  const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;
  return fetch(movieDetailsUrl).then((response) => response.json());
}

function getMovieCast(movieId) {
  const movieCastUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=pt-BR`;
  return fetch(movieCastUrl).then((response) => response.json());
}

function getMoviePlatforms(movieId) {
  const moviePlatformsUrl = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${apiKey}`;
  return fetch(moviePlatformsUrl).then((response) => response.json());
}

function updateRatingCircle(rating) {
  const circle = document.querySelector(".rating-circle");
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (rating / 10) * circumference;
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;

  const ratingText = document.querySelector(".rating-text");
  ratingText.textContent = `${(rating * 10).toFixed(0)}%`;

  if (rating >= 8) {
    circle.style.stroke = "#4caf50"; // verde
  } else if (rating >= 5) {
    circle.style.stroke = "#ffeb3b"; // amarelo
  } else {
    circle.style.stroke = "#f44336"; // vermelho
  }
}

$(document).ready(function () {
  getMovieDetails(movieId)
    .then((details) => {
      const releaseYear = new Date(details.release_date).getFullYear();
      $("#movie-release-year").text(`(${releaseYear})`);
      $("#movie-title").text(details.title);
      $("#movie-poster").attr(
        "src",
        `https://image.tmdb.org/t/p/w500${details.poster_path}`
      );
      $("#movie-genres").text(
        details.genres.map((genre) => genre.name).join(" | ")
      );
      $("#movie-duration").text(`${details.runtime} min`);
      $("#movie-rating").text(`${details.vote_average.toFixed(1)}/10`);
      $("#movie-overview").text(details.overview);
      $("#movie-release-date").text(details.release_date);
      updateRatingCircle(details.vote_average);

      return getMovieCast(movieId);
    })
    .then((castData) => {
      const castContainer = $("#movie-cast");
      castData.cast.slice(0, 10).forEach((castMember) => {
        const castElement = `
          <div class="cast-member">
            <img src="https://image.tmdb.org/t/p/w200${castMember.profile_path}" alt="${castMember.name}">
            <p>${castMember.name}</p>
            <p>${castMember.character}</p>
          </div>
        `;
        castContainer.append(castElement);
      });

      const director = castData.crew.find((member) => member.job === "Director");
      if (director) {
        $("#director-name").text(director.name);
      
        fetch(`https://api.themoviedb.org/3/person/${director.id}?api_key=${apiKey}&language=pt-BR`)
          .then(response => response.json())
          .then(directorDetails => {
            $("#director-photo").attr("src", `https://image.tmdb.org/t/p/w200${directorDetails.profile_path}`);
            $("#director-bio").text(directorDetails.biography);

            fetch(`https://api.themoviedb.org/3/person/${director.id}/movie_credits?api_key=${apiKey}&language=pt-BR`)
              .then(response => response.json())
              .then(movieCredits => {
                const directorMovies = movieCredits.crew.filter(movie => movie.job === "Director").slice(0, 6);
                directorMovies.forEach(movie => {
                  $("#director-movies").append(`<li>${movie.title} (${new Date(movie.release_date).getFullYear()})</li>`);
                });
              });
          });
      }

      return getMoviePlatforms(movieId);
    })
    .then((platformData) => {
      const platforms = platformData.results.BR.flatrate || [];
      const platformsContainer = $("#movie-platforms");
      platforms.forEach((platform) => {
        const platformElement = `
          <img class="platform-logo" src="https://image.tmdb.org/t/p/w200${platform.logo_path}" alt="${platform.provider_name}">
        `;
        platformsContainer.append(platformElement);
      });

      $('.cast-carousel').slick({
        infinite: false,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay: false,
      });
    })
    .catch((error) => {
      console.error("Erro ao buscar detalhes do filme:", error);
    });
});