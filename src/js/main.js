(function ($) {
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

  //content-wrapper
  function contentWrapper(id) {
    // console.log(id, "chris 82")
    $('.wrapper').fadeIn(600, function () {
      $(`.content-wrapper #${id}`).fadeIn(600).addClass("active");
    })
  }

  //right overlay for skills.html
  $('.skills-title a, .see-in-detail').click(function (e) {
    e.preventDefault();
    const id = $(this).attr('id');
    $('.right-overlay').addClass("active").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
      function (e) {
        contentWrapper(id);
      });
    $('.left-container').addClass("inactive");
    $("body").css("overflow", "hidden");
  })

  //when click outside of overlay zone, remove class
  $('.left-container').click(function () {
    if ($(this).hasClass('inactive')) {
      $(".content-wrapper").find('div').each(function (i, obj) {
        if ($(obj).hasClass('active')) {
          const id = $(obj).attr('id');
          $('.wrapper').fadeOut(300, function () {
            $(`#${id}`).fadeOut(300, function () {
              $('.right-overlay').removeClass("active").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
                function (e) {
                  $('.wrapper').hide().removeClass('active');
                  $(`#${id}`).hide().removeClass('active')
                });
              $('.left-container').removeClass("inactive");
            })
          })
        }
      })
    }
    $("body").css("overflow", "auto");
  })

  //close button on skills.html
  $('.wrapper .close-button').click(function (e) {
    e.preventDefault();
    $(".content-wrapper").find('div').each(function (i, obj) {
      if ($(obj).hasClass('active')) {
        const id = $(obj).attr('id');
        $('.wrapper').fadeOut(300, function () {
          $(`#${id}`).fadeOut(300, function () {
            $('.right-overlay').removeClass("active").one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
              function (e) {
                $('.wrapper').hide().removeClass('active');
                $(`#${id}`).hide().removeClass('active')
              });
            $('.left-container').removeClass("inactive");
          })
        })
      }
    })
    $("body").css("overflow", "auto");
  })

  // change the background when mouseenter in the zone
  $('.skills-content')
    .mouseenter(function () {
      $(this).addClass('hover');
    })
    .mouseleave(function () {
      $(this).removeClass('hover');
    })
})(jQuery);
