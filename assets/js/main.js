"use strict";

$(document).ready(function () {
  const header = document.querySelector("header");
  // After loading all images
  $("body").imagesLoaded(function () {
    // Hide loading screen
    $("body > .preloader")
      .delay(500)
      .fadeOut(550, function () {
        $("body").addClass("loaded");
      });
  });

  document.addEventListener("scroll", function () {
    const lastKnownScrollPosition = window.scrollY;
    if (lastKnownScrollPosition > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  $(".grid__link").magnificPopup({ type: "image" });
});
