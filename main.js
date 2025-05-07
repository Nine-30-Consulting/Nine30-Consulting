// Slick Carousel
$(document).ready(function () {
  const settings = {
    autoplay: false,
    dots: true,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 699,
        settings: "unslick",
      },
      {
        breakpoint: 450,
        settings: {
          dots: false,
        },
      },
    ],
  };

  const sl = $("#slick").slick(settings);

  const verticalLine = document.getElementById("vertical-line");
  const elementInView = document.getElementById("timeline-1");

  $(window).on("resize", function () {
    if ($(window).width() < 699 && !sl.hasClass("slick-initialized")) {
      $("#slick").slick(settings);
    }
    if (verticalLine && elementInView && ($(window).width() > 699)) {
      verticalLineSize();
    }
  });

  if (verticalLine && elementInView && ($(window).width() > 699)) {
    verticalLineSize();
  }

  function letterSlide() {
    const letters = document.querySelectorAll(".word.slideIn span");

    letters.forEach(function (char, idx) {
      char.style.animationDelay = .5 + idx / 20 + "s"
    });
  }

  function reverseLetterSlide() {
    const letters = document.querySelectorAll(".word.slideOut span");

    letters.forEach(function (char, idx) {
      char.style.animationDelay = .5 + idx / 20 + "s"
    });
  }

  function wordFade() {
    var $words = $(".word");

    (function _loop(idx) {
      $words.addClass("slideOut").removeClass("slideIn").eq(idx).addClass("slideIn").removeClass("slideOut");
      setTimeout(function() {
        _loop((idx + 1) % $words.length);
      }, 4000);

      letterSlide();
    }(0));
  }

  if (document.querySelector(".hero-title-container")) {
    wordFade();
  }

  const eleToFadeInUpOnScroll = document.querySelectorAll(".content-container-left, .content-container-right");
  const eleToOffset = document.querySelector(".hero-container-casestudies");

  if (eleToFadeInUpOnScroll) {
    window.addEventListener("scroll", function (event) {
      eleToFadeInUpOnScroll.forEach(function (element) {
        if (window.scrollY >= (element.offsetTop + eleToOffset.offsetHeight * 1.5) - window.innerHeight) {
          element.classList.add("fade-in-up");
        } else {
          element.classList.remove("fade-in-up");
        }
      });
    });
  }

  function verticalLineSize() {
      document.addEventListener("scroll", () => {
        const rect = elementInView.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
  
        // Check if timeline-1 is in view
        const isInView = rect.top < viewportHeight && rect.bottom > 0;
  
        if (isInView) {
          const elementTop = elementInView.offsetTop;
          const elementHeight = elementInView.offsetHeight;
          const scrollY = window.scrollY;
  
          // Calculate how much we've scrolled within timeline-1
          let scrolledInElement = scrollY - elementTop - 200;
  
          // Clamp it between 0 and element height
          scrolledInElement = Math.max(0, Math.min(scrolledInElement, elementHeight));
  
          verticalLine.style.height = `${scrolledInElement}px`;
        }
      });
  }
});
