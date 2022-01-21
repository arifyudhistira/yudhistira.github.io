var isSubmited = false;
var isValid = true;

function contactSubmit(el) {
    "use strict";

    event.preventDefault();

    // Get All of Form Data
    var fullName = $(el).find('[name=full_name]').val().trim();
    var email = $(el).find('[name=email]').val().trim();
    var subject = $(el).find('[name=subject]').val().trim();
    var message = $(el).find('[name=message]').val().trim();

    isValid = true;

    fieldsValidator(fullName, email, subject, message);

    // Sending Ajax Request If Informations Are Valid
    if(isValid && !isSubmited) {
        isSubmited = true;

        // Ajax Request
        $.post(
            'php/contact.php',
            $(el).serialize(),
            function(res) {
                if(res == 'Message has been sent') {
                    $('.alerts .alert-success').fadeIn();
                } else {
                    $('.alerts .alert-danger').fadeIn();
                }

                isSubmited = false;
            }
        )
    }
}

$(".contact-form").on("keyup", ".form-control", function(){
    "use strict";

    // Get All of Form Data
    var fullName = $(".contact-form").find('[name=full_name]').val().trim();
    var email = $(".contact-form").find('[name=email]').val().trim();
    var subject = $(".contact-form").find('[name=subject]').val().trim();
    var message = $(".contact-form").find('[name=message]').val().trim();

    fieldsValidator(fullName, email, subject, message);
});

function fieldsValidator(fullName, email, subject, message) {
    "use strict";

    // Full Name Validation
    if(fullName == '') {
        isValid  = false;
        $('[name=full_name]').closest('.form-group').addClass('not-valid');
    } else {
        $('[name=full_name]').closest('.form-group').removeClass('not-valid');
    }

    // Email Validation
    if(email == '') {
        isValid  = false;
        $('[name=email]').closest('.form-group').addClass('not-valid');
    } else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/.test(email))) {
        isValid  = false;
        $('[name=email]').closest('.form-group').addClass('not-valid');
    } else {
        $('[name=email]').closest('.form-group').removeClass('not-valid');
    }

    // Subject Validation
    if(subject == '') {
        isValid  = false;
        $('[name=subject]').closest('.form-group').addClass('not-valid');
    } else {
        $('[name=subject]').closest('.form-group').removeClass('not-valid');
    }

    // Message Validation
    if(message == '') {
        isValid  = false;
        $('[name=message]').closest('.form-group').addClass('not-valid');
    } else {
        $('[name=message]').closest('.form-group').removeClass('not-valid');
    }

}


$(".alert").on("close.bs.alert", function () {
    $(this).hide();
    return false;
});