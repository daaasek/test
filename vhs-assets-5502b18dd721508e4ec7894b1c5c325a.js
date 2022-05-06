$(function() {

    if ($.datetimepicker != undefined) {
        $.datetimepicker.setLocale('de');
        initApplicationDatepicker('application-datepicker-1');
        initApplicationDatepicker('application-datepicker-2');
        function initApplicationDatepicker(classname) {
            var startValue = $('.' + classname).val();
            $('.' + classname).datetimepicker({
                i18n: {
                    de: {
                        months: [
                            'Januar', 'Februar', 'März', 'April',
                            'Mai', 'Juni', 'Juli', 'August',
                            'September', 'Oktober', 'November', 'Dezember'
                        ],
                        dayOfWeek: [
                            "So.", "Mo", "Di", "Mi",
                            "Do", "Fr", "Sa."
                        ]
                    }
                },
                format: 'd.m.Y',
                weeks: false,
                todayButton: false,
                value: startValue,
                lazyInit: true,
                prevButton: false,
                nextButton: false,
                timepicker:false
            });
        }
    }

    document.querySelectorAll('[data-campaign]').forEach(function (form) {
        let campaignCodeSelect = form.querySelector('select[id^=campaignCode]');
        if (campaignCodeSelect !== null) {
            campaignCodeSelect.addEventListener("change", function () {
                form.dataset.campaign = campaignCodeSelect.value;
            });
            form.dataset.campaign = campaignCodeSelect.value;
        }
    })
});

$(document).on("submit", "[data-gdcontactform] form", function(e){
    var $currentForm = $(this);
    var $currentFormWrapper = $currentForm.parents('[data-gdcontactform]');
    $("button", $currentForm).prop('disabled', true);
    e.preventDefault();
    $.ajax({
        url: $currentForm.attr('action'),
        type: "POST",
        data: $currentForm.serialize(),
        dataType: 'json'
    })
    .done(function(response) {
        if ($currentFormWrapper.attr('data-captcha') == 1) {
            grecaptcha.reset();
        }
        $("button", $currentForm).prop('disabled', '');
        if ($currentForm.height() > 600) {
            $('html, body').animate({
                scrollTop: $currentForm.offset().top
            }, 500);
        }
        if (response['success'] == true) {
            $currentForm.fadeOut(500, function() {
                $('[data-gdcontactform-response="ok"]', $currentFormWrapper).fadeIn(500);
                if (window.GdTracking !== undefined) {
                    GdTracking.GoogleTagManager.pushEvent({
                        'event': 'formSuccessfullySubmitted',
                        'submittedFormName': $currentFormWrapper.attr('data-campaign')
                    });
                }
            });
        } else {
            if (response.errors) {
                $.each(response.errors, function (fieldName, errorMsg) {
                    var selector = '[name^="tx_gdcontactforms_contactformajax[formRequest][' + fieldName + ']"]';
                    $currentForm.foundation('addErrorClasses', $(selector, $currentForm));
                    $(selector).each(function(){
                        if ($(this).attr('type') == 'checkbox') {
                            $(selector, $currentForm).parent('.columns').find('label').addClass('is-invalid-label');
                        }
                    });
                });
            } else if(response.msg !== undefined && response.msg != '') {
                $currentForm.fadeOut(500, function() {
                    $('[data-gdcontactform-response="error"] .text', $currentFormWrapper).html('<p class="error">' + response.msg + '</p>');
                    $('[data-gdcontactform-response="error"]', $currentFormWrapper).fadeIn(500)
                });
            }
        }
    });
});

document.addEventListener( 'GdTrackingLoaded', function(e) {
    var utmFromStorage = window.GdTracking.getUtmParameter();
    if (utmFromStorage) {
        document.querySelector('[data-autofill="utm_medium"]').setAttribute('value', utmFromStorage.utm_medium);
        document.querySelector('[data-autofill="utm_source"]').setAttribute('value', utmFromStorage.utm_source);
        document.querySelector('[data-autofill="utm_campaign"]').setAttribute('value',utmFromStorage.utm_campaign);
        document.querySelector('[data-autofill="utm_content"]').setAttribute('value',utmFromStorage.utm_content);
    }
    window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        if (key == 'utm_medium' || key == 'utm_source' || key == 'utm_campaign' || key == 'utm_content' || key == 'ia-pkpmtrack') {
            $('[data-autofill="'+key+'"]').val(value.replace(/(<([^>]+)>)/ig,""));
        }
    });
});

$(function() {
    $('[data-gdcontactform-trigger="back"]').click(function(event){
        event.preventDefault();
        var $currentFormWrapper = $(this).parents('[data-gdcontactform]');
        $('[data-gdcontactform-response]', $currentFormWrapper).fadeOut(500, function() {
            $('form', $currentFormWrapper).fadeIn(500);
        });
    });
});


