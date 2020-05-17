$(document).ready(function () {
    var topics = ['Olaf', 'Mushu', 'Peter Pan', 'Mulan', 'Stitch', 'Pocahontas'];



    // create topic buttons
    function buttonExpress() {
        $('#buttonsView').empty();

        for (var i = 0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('expression');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }
    buttonExpress();

    // on click button
    $(document).on('click', '.expression', function () {
        


        var disney = $(this).html();
        console.log(disney);

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + disney + "&api_key=RierMhnqHyPLgf96A8Z2jCV4TeFFWdla";
        //concole.log(queryURL);
        $.ajax({ url: queryURL, method: 'GET' })
            .done(function (response) {
                //grabs data
               
                var results = response.data;
                
                //console.log(results);
                //emties the div before addng more giphys
                $('#expressView').empty();
                //loops through the data
                for (var j = 0; j < results.length; j++) {
                    var wrapper=$("<div>")
                    var r = $("<p>")
                    r.text(results[j].rating)
                    
                    
                    var imageDiv = $('<img>');

                    imageDiv.attr("src", results[j].images.downsized_large.url)
                    wrapper.append(r,imageDiv)
                
                   // var imageView = results[j].images.fixed_height.url;
                   // var still = results[j].images.fixed_height_still.url;
                    //console.log(imageView);
                   // var expressImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                  //  expressImage.attr('data-state', 'still');
                    $('#expressView').prepend(wrapper);
                   // expressImage.on('click', playGif);

                    //pulling the rating

                   // var rating = results[j].rating;
                    //console.log(rating);
                   // var displayRated = $('<p>').text("Rating: " + rating);
                   // $('#expressView').prepend(displayRated);

                }
            });

        function playGif() {
            var state = $(this).attr('data-state');
            console.log(state);
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            } else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        }

    })

    //adding new button
    $(document).on('click', '#addExpress', function () {
        if ($('#express-input').val().trim() == '') {
            alert('please add character');
        }
        else {
            var car = $('#express-input').val().trim();
            topics.push(car);
            $('#express-input').val('');
            buttonExpress();
            return false;

        }

    });
})



