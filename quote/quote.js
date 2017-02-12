$(document).ready(function() {
	function getQuote() {
		$.ajax({
			url: "http://api.forismatic.com/api/1.0/",
			jsonp: "jsonp",
			dataType: "jsonp",
			data: {
				method: "getQuote",
				lang: "en",
				format: "jsonp"
			},
			success: function(quote) {
				// Test to make quote fit 140 character tweet limit - giving space for author name of up to 25 characters long
				if (quote.quoteText.length > 115) {
					console.log("too long", quote.quoteText);
					getQuote();
				} else {
					$('#quote').empty().append(quote.quoteText);
					if (quote.quoteAuthor == "") {
						quote.quoteAuthor = "anonymous";
						$('#author').empty().append("- ", "anon");
					}
					$('#author').empty().append("- ", quote.quoteAuthor);
					// Remove existing iframe
					$('#tweetBtn iframe').remove();
					// Generate new markup for tweet button widget
					var tweetBtn = $('<a></a>').addClass('twitter-share-button').attr('href', 'http://twitter.com/share').attr('data-url', 'www.freecodecamp.com').attr('data-text', $('#quote').text() + $('#author').text());
					$('#tweetBtn').append(tweetBtn);
					twttr.widgets.load();
          // $( '#title' ).remove();
				}
			}
		});
	}
	// Handler for button to get new quote
	$('#top-btn').on('click', function(ev) {
		ev.preventDefault();
		console.log("go get the quote...");
		// Call to get quote and append to the relevant DOM elements
		getQuote();
	});
	getQuote();
});
