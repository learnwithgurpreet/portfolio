"use strict";

$(document).ready(function () {
  // After loading all images
  $("body").imagesLoaded(function () {
    // Hide loading screen
    $("body > .preloader")
      .delay(500)
      .fadeOut(550, function () {
        $("body").addClass("loaded");
      });
  });

  $(".grid__link").magnificPopup({ type: "image" });
});
