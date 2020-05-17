$(document).ready(function(){

    var Topics = ['Olaf', 'Mushu', 'Peter Pan', 'Mulan', 'Stitch', 'Pocahontas'];


    function displayImg() {

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + "&api_key=RierMhnqHyPLgf96A8Z2jCV4TeFFWdla";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {

            for (var j = 0; j < limit; j++) {

                var displayDiv = $("<div>");
                displayDiv.addClass("holder");

                var image = $("<img>");
                image.attr("src", response.data[j].images.original_still.url);
                image.attr("data-still", response.data[j].images.original_still.url);
                image.attr("data-animate", response.data[j].images.original.url);
                image.attr("data-state", "still");
                image.attr("class", "gif");
                displayDiv.append(image);

                var rating = response.data[j].rating;
                console.log(response);
                var pRating = $("<p>").text("Rating: " + rating);
                displayDiv.append(pRating)

                $("#display-images").append(displayDiv);
            }
        });
    }

    function renderButtons() {

        $("#display-buttons").empty();

        for (var i = 0; i < Topics.length; i++) {

            var newButton = $("<button>")
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input")
            newButton.attr("data-name", Topics[i]);
            newButton.text(Topics[i]);
            $("#display-buttons").append(newButton);
        }
    }

    function imageChangeState() {

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }

        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    
    $(document).on('click', '#submitPress', function () {
        if ($('#user-input').val().trim() == '') {
            alert('please add character');
        }
        else {
            var disneyc = $('#user-input').val().trim();
            Topics.push(disneyc);
            $('#user-input').val('');
            renderButtons();
            imageChangeState();
            return false;
            
        }

    });
    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});



