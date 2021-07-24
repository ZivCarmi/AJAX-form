$('#contact-form').on('submit', function (e) {
  e.preventDefault();

  $('p.text-danger').text('');

  var $name = $('#name'),
    $email = $('#email'),
    $phone = $('#phone'),
    $type = $('#type'),
    $btn = $('#submit-btn'),
    formValid = true,
    emailRegExp = /^(?!.*\.\.)[\w.\-#!$%&'*+\/=?^_`{}|~]{1,35}@[\w.\-]+\.[a-zA-Z]{2,15}$/,
    phoneRegExp = /^0[2-9]\d{7,8}$/;

  var userData = {
    name: $name.val().trim(),
    email: $email.val().trim(),
    phone: $phone.val().trim(),
    type: $type.val().trim()
  }

  $btn.attr('disabled', true);
  $btn.find('span.btn-text').hide();
  $btn.find('.loader').css('display', 'inline-block');

  if (userData.name.length < 2 || userData.name.length > 70) {

    formValid = errorDisplay($name, '* You must enter your name');
  }

  if (userData.email < 6 || !emailRegExp.test(userData.email)) {

    formValid = errorDisplay($email, '* A valid Email is required');

  }

  if (!phoneRegExp.test(userData.phone)) {

    formValid = errorDisplay($phone, '* A valid phone is required');

  }

  if (userData.type == '') {

    formValid = errorDisplay($type, 'Please select a type');

  }

  if (formValid) {

    $.ajax({

      type: 'POST',
      url: 'save-user-data.php',
      dataType: 'html',
      data: userData,
      success: function (res) {

        if (res) {

          window.location = 'tnx.html';

        }

      }

    })

  } else {
    setTimeout(() => {
      $btn.find('span.btn-text').show();
      $btn.find('div.loader').css('display', 'none');
      $btn.attr('disabled', false);
    }, 750);

  }


});

function errorDisplay(element, error) {
  setTimeout(() => {
    $(element).next().text(error);
  }, 750);

  return false;
}