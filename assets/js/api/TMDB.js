const apiKey = "30fa6e17dff8fe90ffee79a3fcaf0175";
const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=1`;

// Busca dados da API do TMDb
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    const carousel = $(".carousel");
    data.results.forEach((movie) => {
      const imageUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;
      carousel.slick(
        "slickAdd",
        `<div><img src="${imageUrl}" alt="${movie.title}"></div>`
      );
    });
  });
