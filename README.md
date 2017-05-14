## liri-node-app
- Author:  Darrell Freeman
- Date 05/13/17 - Week 10 of the Houston Coder's Bootcamp
- Tools used:  Javascript, Node.js, NPM's (Twitter, Spotify, Request)

This project used Node.js to create LIRI, an application that allows users to input search parameters using a set of four different commands.
  * `my-tweets`
    * Command: "node liri.js my-tweets" - Displays the last twenty Twitter tweets of @nclespaul.
    
  * `spotify-this-song` 
    * Command: "node liri.js spotify-this-song `<song-name>`" - Queries the Spotify database and returns the following information:
      * Artist
      * Song Name
      * Spotify URL to preview the song
      * Album Name
    * If no movie name is chosen, the script queries "I Want it That Way" by default
      
  * `movie-this`
    * Command: "node liri.js movie-this `<movie name>`" - Queries the OMD Database and returns the following information:
      *Movie Title
      * Year of Release
      * IMDB Rating
      * Set Locations
      * Language
      * Plot Summary
      * Cast
      * Rotten Tomatoes URL
    * If no movie title is chosen, the script queries "Mr Nobody" by default.
      
  * `do-what-it-says`  
    * Command: "node liri.js do-what-it-says"
       * Reads text from the random.txt file and runs it through the spotify-this-song function, as described above.
  
