

$(document).ready(function() {
    fetchMovies(apiUrlPopular, ".carousel", addMovieToMainCarousel, true);
    fetchMovies(
      apiUrlLaunches,
      ".launches-container",
      addMovieToSecondaryCarousel,
      false,
      3
    );
    fetchMovies(
      apiUrlTopRated,
      ".top-rated-container",
      addMovieToSecondaryCarousel,
      false,
      3
    );
    fetchMovies(apiUrlTrending, ".trending-container", addMovieToSecondaryCarousel);
    fetchMovies(apiUrlUpcoming, ".upcoming-container", addMovieToSecondaryCarousel);
    fetchMovies(apiUrlAction, ".action-container", addMovieToSecondaryCarousel);
    fetchMovies(apiUrlComedy, ".comedy-container", addMovieToSecondaryCarousel);
    fetchMovies(apiUrlDrama, ".drama-container", addMovieToSecondaryCarousel);
    fetchMovies(apiUrlClassic, ".classic-container", addMovieToSecondaryCarousel);
    fetchMovies(
      apiUrlAnimation,
      ".animation-container",
      addMovieToSecondaryCarousel
    );
    fetchMovies(apiUrlHorror, ".horror-container", addMovieToSecondaryCarousel);
    fetchMovies(apiUrlSciFi, ".scifi-container", addMovieToSecondaryCarousel);
    fetchMovies(apiUrlRomance, ".romance-container", addMovieToSecondaryCarousel);
    fetchMovies(
      apiUrlDocumentary,
      ".documentary-container",
      addMovieToSecondaryCarousel
    );
  });
  
  function movieOnClick(movieId) {
    window.location.href = `movieDetails.html?movieId=${movieId}`;
  }