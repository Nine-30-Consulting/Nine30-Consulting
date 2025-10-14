// Slick Carousel
$(document).ready(function () {
  // Mobile Menu //

  let menuToggle = document.querySelector('.menuToggle');
  let header = document.querySelector('header');
      menuToggle.onclick = function(){
      header.classList.toggle('active');
  }

  // Countdown Timer 9.30 //

  var currentDateTime = new Date();
  var currentYear = currentDateTime.getFullYear();
  var countDownDate = new Date("09/30/" + currentYear + " 06:00 AM");

  var x = setInterval(function() {
      var now = currentDateTime.getTime();
      var nextYear = currentDateTime.getFullYear() + 1;
      var newCountDownDate = new Date("09/30/" + nextYear + " 06:00 AM");

      var distance = countDownDate - now;

      if (distance < 0) {
          clearInterval(x);
          distance = newCountDownDate - now;
      }

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("demo").innerHTML = days + " ";
  }, 1000);

  if (document.getElementById("slick")) {
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
  }

  if (document.querySelector(".hero-title-container")) {
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
  }

  if (document.getElementById("timeline-1")) {
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
  }
});
