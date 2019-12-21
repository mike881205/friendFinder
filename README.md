# friendFinder

## Overview

This app is deigned to handle user inputs, compare the inputs against a predefined array of data, and return a result based on certain criteria.

## Instrucitons

Upon loading the page, the user will click the button to begin the survey. Once on the survey page, the user will fill out both the name and photo field, and then give a resposne to each question. Once finished, the user will submit their responses, and they will be given the best-matched result based on their answer choices.

## App Logic

### [Server](server.js)

Once the server code is run, the server will connect to the selected port and bring in the apiRoutes and htmlRoutes code

### Routes

1. [HTML Routes](app/routing/htmlRoutes.js) - This code will handle what happens when a user visists a specific page.

    * If the user visits the "/" route, they will be directed to the [home page](app/public/home.html)

    * If the user visists the "/survey" route, they will be directed to the survey page.

        ### [Survey Page](app/public/survey.html)

        Apart from building out the page structure/layout, this file contains the 'on click' function when the user clicks they 'submit' button after filling out the survey.

        * Submit 'On Click' Function

            Once the user clicks the 'submit' button, a function will run. The function will first make sure that there is a user input for each field/question.

            * If there are no empty fields/unaswered questions:

                1. Create an object to store the users information - Name: , Photo: , Object: 

                2. Send an AJAX call to the server to run the code to evaluate the best match for the user based on the submitted information (see API route logic below)

                3. Once the information is returned, bring up a modal with the Name, Photo, and result info of the best match.

            * If there are empty fields/questions

                * Diplay an alert telling the user to enter information in all fields.

        * Close 'On Click' function

            When the user clicks the 'close' button on the modal, the page will reload and reset all information fields/selections so the the user can retake the survey.

2. [API Routes](app/routing/apiRoutes.js) - This code will handle server requests to get information form and post information to the api's.

    * If the user visits the "/api/friends" route, a 'get' request will occur, and they will be directed to a page showing all of the information within the friends data array from the [friends.js](app/data/friends.js) file

    * When the user submits their survey, a post request will occur that finds the best match for a user within the friends data array based on the code logic, and return that objects information. It will also store the new information submitted via the survey to the friends data array.

    ### API route logic for evaluating the best match

    1. The users question scores are saved in an array called "newScores"

    2. Looping through the friends data array:

        1. The current index's (friend) question scores are saved in an array called "friendsScores"

        2. Looping through the length of the newScores array and the friendsScores array (both have a length of 10):

            1. Each index of both arrays is parsed for an integer and each integer is stored in varaibales: newScoreInt & friendScoreInt

            2. The difference between the 2 variables is stored to a variable (difference)

                * If the difference is a negative number, it is multiplied by -1 to be made positive
            
            3. The difference integer is then pushed to the diffArray array.

        3. For each loop through the friends data array, each friend's scoreTotal begins at 0. Looping through the diffArray, each integer is added together, and the total is stored in a variable called 'scoreTotal'.

        4. Each friend's scoreTotal is pushed to the finalScores array

    3. The 'findLowestScore' function will find the lowest score within the 'finalScores' array. 
    
    4. Looping throug the finalScores array:

        * The lowest score returned by the 'findLowestScore' function will be checked against each value of the finalScores array.
        
        * Once the lowest score matches a value within the finalScores array, the actual value of the index (i) of the matching value is store into the 'bestMatchIndex' variable

    5. Looping through the friends data array again, find the object with the index value equal to the best match index and store the object in the 'bestMatch' variable

    6. Send the 'bestMatch' object information JSON response (see the survey page information above)

    7. Push the submitted user data to the friends data array.



