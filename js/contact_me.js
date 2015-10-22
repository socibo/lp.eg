$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
	    var name = $("input#name").val(),
		fName, lName,
		data = {
                    email_address: $("input#email").val(),
		    status: 'subscribed',
		    merge_fields: {
			FNAME: fName,
			LNAME: lName,
			PHONE: $("input#phone").val(),
			FB_PAGE_URL: $("input#fb_page_url").val(),
			MSG: $("input#message").val()
		    }
		};

            // Check for white space in name for Success/Fail message
            if (name.indexOf(' ') >= 0) {
                fName = name.split(' ').slice(0, -1).join(' ');
		
            } else {
		fName = name;
	    }
	    data.merge_fields.FNAME = fName;
		    
            $.ajax({
                url: "https://us11.mailchimp.com/3.0/lists/c3155840a1/members/",
                type: "POST",
		username: 'anystring',
		passoword: '437552b96efa87eab0a786dc63d66a06-us11',
                data: data,
                cache: false,
                success: function() {
                    // Success message
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Your message has been sent. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Sorry " + fName + ", it seems that Socibo mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
