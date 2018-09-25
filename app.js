var animals = ["dog", "cat", "fish", "bird"];

// This function creates new buttons for each item in the index animals. It assigns each button an ID that matches the animal
function renderButtons () {
    $("#buttons").empty();
    for (var i = 0; i < animals.length; i++){
        var button = $('<button>');
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
            var gifDiv = $("<div>");
            var p = $("<p>").text("Rating: " + results[i].rating);
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height.url);
            gifDiv.append(p);
            gifDiv.append(gifImage);
            $("#gifs").prepend(gifDiv);
    }
    });
};

//This event handler is running the function when any object with animalButton class is clicked at any point in time
$(document).on("click", ".animalButton", function(){
    queryGiphy($(this).attr("id"));
});

//This will work for non dynamically created things - this only works based on objects in the document when the html is originally loaded
// $(".animalButton").on("click", function(){
//     queryGiphy($(this).attr("id"));
// });


// API key: cm4FGvyOUua1vc66K0nzgJCX8w9HXRPy