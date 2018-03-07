
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

  //recover overlay class
  function connectPage() {
    $('.overlay').removeClass("active");
  }
  //overlay add clss
  $(".overlay-button").click(function () {
    $('.overlay').addClass("active");
    setTimeout(() => {
      connectPage()
    }, 1000);
  });



})(jQuery);