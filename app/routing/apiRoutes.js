// ===============================================================================
// Load in Friends Data
// ===============================================================================

let friendsData = require("../data/friends.js");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {

  // When the user visists the '/api/friends' link, they are shown a JSON of the data in the table
  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  // Below code handles when a user submits a form and thus submits data to the server.
  app.post("/api/friends", function (req, res) {

    // Store User Scores into a variable
    let newScores = req.body.scores

    // This array will hold the 'total of the differences' for the score of each friend (scoreTotal)
    let finalScore = []

    // Loop through the friends data array
    for (let i = 0; i < friendsData.length; i++) {

      // Store the friend scores array of the current index to a variable
      let friendScores = friendsData[i].scores

      // This array will hold the values of the difference between each friendScores[i] & newScores[i] of the current friend
      let diffArr = []

      // Loop through each value of the user scores and friend scores
      for (let i = 0; i < 10; i++) {

        //Store the value of each index in a variable
        let newScoreInt = parseInt(newScores[i]);
        let friendScoreInt = parseInt(friendScores[i])

        // Store the difference between the two indexes in a variable
        let difference = (newScoreInt - friendScoreInt)

        // If the difference is a negative number, multiply the difference by negative one (-1) to make the number positive
        if (difference < 0) {
          difference = difference * -1;
        }

        // Add the difference to an array (diffArr)
        diffArr.push(difference)

      }

      // Each time the scores of a friend are evaluated set the score total to 0
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

    // Create a variable to hold the index of the best match
    let bestMatchIndex;

    // Loop through the final scores in the finalScore array
    for (let i = 0; i < finalScore.length; i++) {

      // If the lowest value in the final score array is equal to the current index in the array
      if (findLowestScore(finalScore) === finalScore[i]) {

        // Store the value of the index to a variable
        bestMatchIndex = i

      }

    }

    // Create a variable to store the information of the best match
    let bestMatch;

    // Loop through the friends data array
    for (let i = 0; i < friendsData.length; i++) {

      // The best match is the object with an index value equal to the 'bestMatchIndex'
      // Store the object information to the bestMatch variable
      bestMatch = friendsData[bestMatchIndex]
    }

    // send the results to the survey.html file
    res.json(bestMatch)

    // Add the new user information to the friends array
    friendsData.push(req.body);
  });
};