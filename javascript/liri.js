// Get twitterKeys from keys.js
var keys = require('./keys.js');
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var client = new Twitter(keys.twitterKeys);

//  Variable to store user input.
var input = process.argv;        

//  Variable to store user's command choice.
//  Choices are "my-tweets", "spotify-this-song", "movie-this", or "do-what-it-says".  Any other choices result in an error.
var choice = process.argv[2];   

// Variable to hold concatenated input if the user inputs more than one word.
var x = "";

// Routine that concatenates multi-word search inputs from the user and stores the result in variable "x".
for (var i = 3; i < input.length; i++) {
  if (i > 3 && i < input.length) {
    x = x + "+" + input[i];
  } else {
    x = x + input[i];
  }
}

// Determine the appropriate function to run based on the user command choice.
if (choice == "my-tweets") {
    myTweets();
} else if (choice == "spotify-this-song") {
    if (x) {
      songs(x);
    } else {
      songs("The Sign");
    }
} else if (choice == "movie-this") {
    if (x) {
       movies(x)
     } else {
       movies("Mr. Nobody")
     }
} else if (choice == "do-what-it-says") {
    doIt();
} else {
    console.log("Not a valid command.")
}


// ----------------------- Functions for each of the commands ------------------------------------ //

// To display my last twenty tweets (I only have 3 at this time.  Not a big social media person.)
// This function was copied from "https://www.npmjs.com/package/twitter".
function myTweets() {
  fs.appendFileSync('log.txt', "@nclespaul's tweets: \r\n");
  var userName = {screen_name: 'nclespaul'};
  client.get('statuses/user_timeline', userName, function(error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var date = tweets[i].created_at;
        console.log("@nclespaul: " + tweets[i].text + " Date Created: " + date.substring(0, 19));
        
        // Create and add text to log.txt file
        fs.appendFile('log.txt', "@nclespaul: " + tweets[i].text + " Date Created: " + date.substring(0, 19) + "\r\n");
        if (i == (tweets.length - 1)) {
            fs.appendFile('log.txt', "---------------------------------------------------------------------------------------------------------------------------------------------------------------------\r\n");
        }
      }
    } else {
      console.log('An error occurred');
    }
  });
}

function songs(song) {
  spotify.search({ type: 'track', query: song}, function(error, data) {
    if (!error) {
      for (var i = 0; i < data.tracks.items.length; i++) {
        var songData = data.tracks.items[i];
        console.log("Artist: " + songData.artists[0].name);     
        console.log("Song: " + songData.name);                  
        console.log("Preview URL: " + songData.preview_url);    
        console.log("Album: " + songData.album.name);          
        console.log("-----------------------------------------------------------------------------------------------------");
        
        //adds text to log.txt
        fs.appendFileSync('log.txt', songData.name + " search results:\r\n");
        fs.appendFileSync('log.txt', "Artist: " + songData.artists[0].name + "\r\n");
        fs.appendFileSync('log.txt', "Song: " + songData.name + "\r\n");
        fs.appendFileSync('log.txt', "Preview URL: " + songData.preview_url + "\r\n");
        fs.appendFileSync('log.txt', "Album: " + songData.album.name + "\r\n");
        fs.appendFileSync('log.txt', "--------------------------------------------------------------------------------------------------------------\r\n\r\n");
      }
    } else {
      console.log('An error occurred.');
    }
  });
}

function movies(movie){
  var movieURL = 'http://www.omdbapi.com/?t=' + movie + '&plot=short&tomatoes=true';

  request(movieURL, function (error, response, body){
    if (!error && response.statusCode == 200) {
      var body = JSON.parse(body);
      console.log("Title: " + body.Title);
      console.log("Release Year: " + body.Year);
      console.log("IMdB Rating: " + body.imdbRating);
      console.log("Country: " + body.Country);
      console.log("Language: " + body.Language);
      console.log("Plot: " + body.Plot);
      console.log("Actors: " + body.Actors);
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);

      fs.appendFileSync('log.txt', "Title: " + body.Title + "\r\n");
      fs.appendFileSync('log.txt', "Release Year: " + body.Year + "\r\n");
      fs.appendFileSync('log.txt', "IMdB Rating: " + body.imdbRating + "\r\n");
      fs.appendFileSync('log.txt', "Country: " + body.Country + "\r\n");
      fs.appendFileSync('log.txt', "Language: " + body.Language + "\r\n");
      fs.appendFileSync('log.txt', "Plot: " + body.Plot + "\r\n");
      fs.appendFileSync('log.txt', "Actors: " + body.Actors + "\r\n");
      fs.appendFileSync('log.txt', "Rotten Tomatoes URL: " + body.tomatoURL + "\r\n");
      fs.appendFileSync('log.txt', "--------------------------------------------------------------------------------------------------------------\r\n\r\n");

    } else {
      console.log('An error occurred.')
    }
  });

}

function doIt() {
  fs.readFile('random.txt', "utf8", function(error, data) {
    var txt = data.split(',');
    songs(txt[1]);
  });
}