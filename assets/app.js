$(document).ready(function(){
//Array for searched topics to be added
var birds=[];
//Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
//Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
function displayBirds(){

	var x = $(this).data("search");
	console.log(x);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=8";

	console.log(queryURL);

	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response){
		var results = response.data;
		
		console.log(results);

		for (var i= 0; i < results.length; i++){
			var name = results[i].name;
			var showDiv = $("<div class='col-md-4'>");
			var defaultAnimatedSrc = results[i].images.fixed_height.url;
			var staticSrc = results[i].images.fixed_height_still.url;
			var showImage = $("<img>");
			var p = $("<p>").text(birds);


			showImage.attr("src", staticSrc);
			showImage.addClass("birdsGiphy");
			showImage.attr("data-state", "still");
			showImage.attr("data-still", staticSrc);
			showImage.attr("data-animate", defaultAnimatedSrc);
			showDiv.append(p);
			showDiv.append(showImage);

			$("#gifArea").prepend(showDiv);

		}
	});
}

	//Submit button click event takes search term from form input, trims and pushes to topics array, displays button

	$("#addBird").on("click", function(event) {
        event.preventDefault();
        var newName = $("#birdsInput").val().trim();
        birds.push(newName);

        console.log(birds);

        $("#birdsInput").val('');
        displayButtons();

      });

	//Function iterates through birds array to display button with array values in "myButtons" section of HTML

	function displayButtons(){
		$("#myButtons").empty();


		for (var i= 0; i < birds.length; i++){
			var a =$('<button class="btn btn-primary">');
			a.attr("id", "bird");
			a.attr("data-search", birds[i]);
			a.text(birds[i]);

			$("#myButtons").append(a);

		}
	}

	displayButtons();
	//Click event on button with id of "birds" executes displayBirds function
		$(document).on("click", "#bird", displayBirds);

		//Click event on gifs with class of "netflixGiphy" executes pausePlayGifs function
		$(document).on("click", ".birdsGiphy", pausePlayGifs);

		//Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
		function pausePlayGifs() {
     var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  }
}


	});
