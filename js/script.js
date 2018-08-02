jQuery.extend(jQuery.easing, {
    easeInOutExpo: function (x, t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    }
});

$(document).ready(function () {

    // Analyser form
    var analyserForm = $("form#analyser-form");
    analyserForm.submit(function(event){
        event.preventDefault();
        fbq('track','Lead');
        gtag('event', 'analyselead');
        // Change to your service ID, or keep using the default service
        var service_id = "default_service";
        var template_id = "analyser";
        analyserForm.find("button").text("Sending...");
        emailjs.sendForm(service_id,template_id,"form#analyser-form")
            .then(function(){ 
            
            analyserForm.find("button").text("Sent!");
            window.location.hash = 'submitted';
        }, function(err) {
            alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
            analyserForm.find("button").text("Sent!");
        });
        return false;
    });

    // Bottom Form
    var myform = $("form#myform");
    myform.submit(function (event) {
        event.preventDefault();
        gtag('event', 'contactform');
        // Change to your service ID, or keep using the default service
        var service_id = "default_service";
        var template_id = "template_ETEAAIDi";

        myform.find("button").text("Sending...");
        emailjs.sendForm(service_id, template_id, "form#myform")
            .then(function () {
                alert("Sent!");
                myform.find("button").text("Sent!");
            }, function (err) {
                alert("Send email failed!\r\n Response:\n " + JSON.stringify(err));
                myform.find("button").text("Sent!");
            });
        return false;
    });
    
    $('a[href=#]').click(function (e) {
        e.preventDefault();
        $('nav').removeClass('visible');
        $('html,body').stop().animate({
            scrollTop: $('.' + $(this).data('scrollto')).offset().top - 65
        }, 700, 'easeInOutExpo', function () {});
    });

    $('.toggle-menu').click(function () {
        $('nav').toggleClass('visible');
    });

    if ($(window).width() < 800) {
        $('.pricing > div > div:nth-of-type(3)').insertAfter($('.pricing > div > div:nth-of-type(1)'));
    }

});

    // Enter hook
    $('#analyser').keypress(function (e) {
        
        if (e.which == 13) {
          $('#analyse-btn').click();
          e.preventDefault();
          return false;    //<---- Add this line
        }
      });
      
function stopAnimation(element) {
    $(element).css("-webkit-animation", "none");
    $(element).css("-moz-animation", "none");
    $(element).css("-ms-animation", "none");
    $(element).css("animation", "none");
}

// Analyser
$('.analyse-btn').click(function (e) {
    e.preventDefault();
    gtag('event', 'analyse');
    var sWebsite = $('#analyser').val();
    $('#website-form-input').val(sWebsite);

    $('#analyser-loadingbar-title').html('Analysing: ' + sWebsite);

    // Hide first screen
    $('#analyser-container').hide();

    // Show loading bar
    $('#analyser-loadingbar').show();

    // Accumulate errors
    setTimeout(function () {
        $('#analyser-loadingbar-value').html('2 Errors Found');
        setTimeout(function () {
            $('#analyser-loadingbar-value').html('3 Errors Found');
            setTimeout(function () {
                $('#analyser-loadingbar-value').html('4 Errors Found');
                setTimeout(function () {
                    $('#analyser-loadingbar-value').html('6 Errors Found');
                    setTimeout(function () {
                        $('#analyser-loadingbar-value').hide();
                        // Stop the loading bar
                        $('.bar').hide();
                        $('#analyser-loadingbar-title').hide();
                        $('.lead-container h2, #lead-text').hide();
                        // Show the 'See Results page'
                        $('#analyser-results').show();
                    }, 3000);
                }, 4500);
            }, 500);
        }, 3500);
    }, 3000);



    // Show 'See Results' screen with email input
});