
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
      window.history.pushState({ path: url }, '', url);
    }, 700);
  }
 

  $('a.link-page').click(function (e) {
    e.preventDefault();
    const url = $(this).attr("href");
    $('.overlay').addClass("firstLoading");
    $('.overlay').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
      function (e) {
        window.location.href = url;
        removeLoadingClass(url)
      });
  });

  $(window).on('popstate', function () {
    console.log("chris");
    // var newPageArray = location.pathname.split('/'),
    //     //this is the url of the page to be loaded 
    //     newPage = newPageArray[newPageArray.length - 1];
    // if( !isAnimating ) changePage(newPage);
  });

})(jQuery);