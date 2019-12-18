// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

let friendsData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {

    // ==================================================================
    // Find the best match
    // ==================================================================

    // Store User Scores into variable
    let newScores = req.body.scores

    let finalScore = []

    // Loop through the friends object
    for (let i = 0; i < friendsData.length; i++) {

      // Store the friend scores array of the current index to a variable
      let friendScores = friendsData[i].scores
      let diffArr = []

      // Loop through the user scores and friend scores of the current index
      for (let i = 0; i < 10; i++) {

        //Store the value of each index in a variable
        let newScoreInt = parseInt(newScores[i]);
        let friendScoreInt = parseInt(friendScores[i])

        // Store the difference between the two indexes in a variable
        let difference = (newScoreInt - friendScoreInt)

        // If the difference is a negative number, multiply the difference by negative one (-1)
        if (difference < 0) {
          difference = difference * -1;
        }

        // Add the difference to an array (diffArr)
        diffArr.push(difference)

      }

      let scoreTotal = 0

      // Loop through the array of differences (diffArr) and add all of the values together
      for (let i = 0; i < diffArr.length; i++) {
        scoreTotal = scoreTotal += diffArr[i]
      }

      // Add the total score to an array (finalScore)
      finalScore.push(scoreTotal)

    }

    // This function will find the lowest value in a given array
    function findLowestScore(input) {
      if (toString.call(input) !== "[object Array]")
        return false;
      return Math.min.apply(null, input);
    }

    let matchArray = [];

    // Loop through the final scores in the finalScore array
    for (let i = 0; i < finalScore.length; i++) {

      // If the lowest value in the array is equal to the current index in the array
      if (findLowestScore(finalScore) === finalScore[i]) {
        // Add the matching index number [i] to an array (matchArray)
        matchArray.push(i)
      }

    }

    // ==================================================================
    // If there are multiple matches
    // ==================================================================

    let allMatches = []

    // Loop through the matchArray
    for (let i = 0; i < matchArray.length; i++) {

      // Store the value of the index to a variable
      let matchIndex = matchArray[i]

      // Loop through the friendsData array
      for (let i = 0; i < friendsData.length; i++) {

        // If the matchIndex is equal to the index of the friendsData object
        if (matchIndex === friendsData.indexOf(friendsData[i])) {

          // Add the object to an array (allMatches)
          allMatches.push(friendsData[i])
        }

      }

    }

    // Choose a random match and assign it to a variable
    let match = allMatches[Math.floor(Math.random() * allMatches.length)]

    console.log(match)
    console.log("=======================")

    friendsData.push(req.body);
  });
};