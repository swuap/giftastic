var animals = ["dog", "cat", "fish", "bird"];



function renderButtons () {
    for (var i = 0; i < animals.length; i++){
        var button = $('<button>');
        button.attr("id", animals[i]);
        button.text(animals[i]);
        $("#buttons").append(button);
    };
};

renderButtons();


$("#dog").on("click", function(){
    console.log("dog!");
});
