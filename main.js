// Slick Carousel
$(document).ready(function(){
  const settings = {
    autoplay: false,
    dots: true,
    mobileFirst: true,
    responsive: [
        {
          breakpoint: 699,
          settings: "unslick"
        },
        {
          breakpoint: 450,
          settings: {
            dots: false
          }
        }
    ]
  };

  const sl = $('#slick').slick(settings);

  $(window).on('resize', function () {
      if ($(window).width() < 699 && !sl.hasClass('slick-initialized')) {
          $('#slick').slick(settings);
      }
  });
});