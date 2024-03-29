# code_challenge

## Main points of feedback
After the initial submission, the reply was the following:

* UI could be clearer
* Integrate automated tests
* Business Logic was convoluted with Display Logic
* Language use could be more idiomatic (use string literals, remove superfluous comments, etc.)


Current Implementation: https://javier123454321.github.io/code_challenge

All extremely insightful feedback, and there were also these questions to ponder:

What if the API is slow or responds with errors? How long should you wait for a response? How can you simulate problems with the API in your local testing?
Internal quality
If someone else was working on this project with you, how would they gain confidence that their changes don’t break the existing behavior?
What was the first step you took when you received this code challenge?  How did you begin creating the requested application?
How would your application need to change if you wanted it to be served as a mobile app? A web app? 
Why didn’t you bring in a third party library to help with the API request/JSON parsing?
What were the tradeoffs for the language choice you made?

Testing and error handling involved much of my time. I am completely new to Unit Testing (I learned it for this challenge), and thinking in a more test driven way. I was only able to create a few unit tests, definitely not thorough enough to ensure that a change won't break anything.

The first steps I took was reading the documentation for the Google Books api, and get a successful request back, then learn how the response was formatted, and which information was relevant. The rest was formatting the jsons and handling the most obvious errors that I kept running into.

To move into a webapp/mobile app I would start by moving the logic to a backend and make the application more modular, generally separating business and display logic as I did for this resubmission.

I used the XMLHttpRequest methods for JS because of both my familiarity with that and the application was 'simple' enough not to warrant something else. I also like the error handling depending on the response code.

Javascript is becoming my favorite language the more that I become familiar with it. It seems to lack precision in regards to floats, and I probably wouldn't use it for computational applications. I really like Java for more robust and precise computations, but to get a quick result on the browser and do simple http requests on a network, JS was a no-brainer for me. I also really like it, as a lot of my thinking is visual, and js with html and css can make something visual with very little overhead.

I spent very little time on the UI and the UX, as the logic for the program seems to me to be the more relevant content. I would definitely move towards fixing the design as a next step if I was to stick with this project. 


# Initial Submission

## Implementation

link to original implementation: https://javier123454321.github.io/code_challenge/original_submission/googlebooksapi.html

I chose to do it in JavaScript because of my familiarity with the language specifically in regards to doing asynchronous http requests. I gave the UX, only enough attention to make it functional. I decided to go with a graphic application because it made most sense to me to select the divs with all the info by clicking on them. It did cause me to have to resist the urge to make it more visually appealing at every step. I could not, however, resist making the button clicking more interactive, though it is far from pleasant. One thing that I learned in design school is that it is sometimes better not to design something at all than to design it badly for lack of time. I hope that it doesn't hurt my chances here.

As far as the functionality and reliability, the form was crashing when the user input a string with only spaces, and also when there were no results for the query. Another issue that caused problems at the beginning was having multiple authors per book. I created cases that handled all those exceptions. I imagine there are unforseen circumstances that will still cause an error, but the way it is set up should catch it. 

The reading list feature is stored locally, and therefore resets on browser refresh. I did put a limit on adding the same book to the reading list twice, with an updating title that informs the user.

Thank you for stopping by, and I hope you enjoy!
