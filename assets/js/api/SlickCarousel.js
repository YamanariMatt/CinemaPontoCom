$(document).ready(function(){
    $('.carousel').slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerMode: true,
      centerPadding: '20%',
      autoplay: true,
      autoplaySpeed: 2000,
    });
  });

  
$(document).ready(function() {
  $('.launches-container').slick({
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
  });
});