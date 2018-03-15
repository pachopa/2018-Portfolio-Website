(function ($) {
  //contactForm 
  $('button.sendButton').click(function () {
    var $contactForm = $('#contactForm');
    var $contactFormFeedBack = '';
    var name = $('.userName').val();
    var email = $('.userEmail').val();
    var message = $('.message').val();
    if (name == '' || email == '' || message == '') {
      console.log("chris")
      $('.thankMsg').fadeIn().text('Fill in the all blank, please :D');
    } else {
      $.ajax({
        type: "POST",
        url: "send-email.php",
        data: { name: name, email: email, message: message }
      }).success(function (html) {
        $('.thankMsg').fadeIn().text('Thank you for your email!');
        $('.userName').val('');
        $('.userEmail').val('');
        $('.message').val('');
      }).error(function (html) {
        console.log("error")
      })
    }
  });

  $(".typed").typed({
    strings: [`hello`, 'hi', 'chris'],
    typeSpeed: 600,
    // backDelay: 1000,
    showCursor: null,
    startDelay: 800,
    // loop
    loop: false,
    backspace: false,
    fadeOut: true,
    fadeOutDelay: 20000,
    smartBackspace: false,
  });

  $(window).load(function (e) {
    setTimeout(() => {
      $('.overlay').removeClass("firstLoading");
    }, 700);
  })

  //window load
  function removeLoadingClass(url) {
    setTimeout(() => {
      $('.overlay').removeClass("firstLoading");
    }, 700);
  }

  $('a.link-page').click(function (e) {
    e.preventDefault();
    const url = $(this).attr("href");
    $('.overlay').addClass("firstLoading");
    window.history.pushState(url, null, url);
    $('.overlay').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
      function (e) {
        window.location.href = url;
        removeLoadingClass(url)
      });
  });

  if (window.history && window.history.pushState) {
    $(window).on('popstate', function () {
      const urlPath = window.location.pathname.split("/");
      const url = urlPath[1];
      $('.overlay').addClass("firstLoading");
      $('.overlay').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function (e) {
          window.location.href = url;
          removeLoadingClass(url)
        });
    });
  }

  //right overlay for skills.html
  $('.skills-title a, .see-in-detail').click(function (e) {
    e.preventDefault();
    $('.right-overlay').addClass("active");
    $('.left-container').addClass("inactive");
  })

  //when click outside of overlay zone, remove class
  $('.left-container').click(function () {
    if ($(this).hasClass('inactive')) {
      $('.right-overlay').removeClass("active");
      $('.left-container').removeClass("inactive");
    }
  })

  //close button on skills.html
  $('.wrapper .close-button').click(function (e) {
    e.preventDefault();
    $('.right-overlay').removeClass("active");
    $('.left-container').removeClass("inactive");
  })



  $('.overlay').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
        function (e) {
          window.location.href = url;
          removeLoadingClass(url)
        });

  // change the background when mouseenter in the zone
  $('.skills-content')
    .mouseenter(function () {
      $(this).addClass('hover');
    })
    .mouseleave(function () {
      $(this).removeClass('hover');
    })
})(jQuery);
