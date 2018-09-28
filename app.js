var animals = ["dog", "cat", "fish", "bird"];

// This function creates new buttons for each item in the index animals. It assigns each button an ID that matches the animal
function renderButtons () {
    $("#buttons").empty();
    for (var i = 0; i < animals.length; i++){
        var button = $('<button type="button" class="btn btn-primary"></button>');
        button.attr("id", animals[i]);
        button.attr("class", "animalButton");
        button.text(animals[i]);
        $("#buttons").append(button);
    };
};

// This calls the function creating new buttons with the animals array
renderButtons();

// This adds new animals in to the array when submitted through the input box, and re-runs the button creation function
$("#button-addon2").on("click", function(){
    newAnimal = $("#input").val();
    animals.push(newAnimal);
    renderButtons();
});

//This code is querying the giphy API and then creating divs/imgs with the data from the API
function queryGiphy (id) {
    queryAnimal = id;
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=cm4FGvyOUua1vc66K0nzgJCX8w9HXRPy&q=" + queryAnimal + "&limit=10&offset=0&rating=R&lang=en";

    $.ajax({
        url: queryURL,
        method:"GET"
    })

    .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<span>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_still.url);
            gifDiv.append(gifImage);
            gifDiv.append(p);
            $("#gifs").prepend(gifDiv);
            
            // This code is adding the pause functionality to the gifs
            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
            gifImage.attr("data-animate", results[i].images.fixed_height.url);
            gifImage.attr("class", "gif");
            gifImage.attr("data-state", "still");
    }
    });
};

//This event handler is running the function when any object with animalButton class is clicked at any point in time
$(document).on("click", ".animalButton", function(){
    queryGiphy($(this).attr("id"));
});

//This event handler is allowing the gifs to be paused when clicked
$(document).on("click", ".gif", function(){
    var state = $(this).attr("data-state");

    if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

// API key: cm4FGvyOUua1vc66K0nzgJCX8w9HXRPy