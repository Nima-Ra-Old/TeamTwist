var slideNumber = 1;

setInterval(() => {
  var currentSlide = document.getElementById("top-slider-"+String(slideNumber));
  if (document.getElementById("top-slider-"+String(slideNumber + 1))) {
    // next slide exist
    var nextSlide = document.getElementById("top-slider-"+String(slideNumber + 1));

    $("#top-slider-"+String(slideNumber)).fadeOut("slow", () => {
      currentSlide.style.display = 'none';
      $("#top-slider-"+String(slideNumber + 1)).fadeIn("slow", () => {
        nextSlide.style.display = 'block';
        slideNumber++;
      });
    });

  } else {
    // go to the first slide
    var nextSlide = document.getElementById("top-slider-1");

    $("#top-slider-"+String(slideNumber)).fadeOut("slow", () => {
      currentSlide.style.display = 'none';
      $("#top-slider-1").fadeIn("slow", () => {
        nextSlide.style.display = 'block';
      });
    });
    slideNumber = 1;
  }



}, 4000);
