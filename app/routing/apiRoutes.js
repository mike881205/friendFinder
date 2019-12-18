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
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    
    let scoreArray = []
    let lowestScore = Math.min(scoreArray)
    let lowScoreIndex;

    for (let i = 0; i < friendsData.length; i++) {
      let sum = 0;
      let differenceArr = []
      let score = 0
      let diffTotal;
      let difference;
      let friendScoreInt;
      let newScoreInt;
      let friendScores = friendsData[i].scores

      for (let i = 0; i < friendScores.length; i++) {
        friendScoreInt = parseInt(friendScores[i])
      }

      for (let i = 0; i < req.body.scores.length; i++) {
        newScoreInt = parseInt(req.body.scores[i])
      }

      difference = (newScoreInt - friendScoreInt)

      if (difference < 0) {
        difference = difference * -1;
      }

      differenceArr.push(difference)

      for (let i = 0; i < differenceArr.length; i++) {
        diffTotal = sum += differenceArr[i]
        score = score + diffTotal
      }

      scoreArray.push(score)

    }

    console.log(scoreArray)
    console.log(lowestScore)

    for (let i = 0; i < scoreArray.length; i++) {
      if (lowestScore === scoreArray[i]) {
        lowScoreIndex = i
      }
    }

    console.log(lowScoreIndex)

    for (let i = 0; i < friendsData.length; i++) {
      if (lowScoreIndex = i) {
        console.log(friendsData[i])
      }
    }

    friendsData.push(req.body);
  });
};