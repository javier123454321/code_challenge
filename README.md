# code_challenge

## requirements for the project
Was tasked to create a command line app that accomplished the following
  *  This application should allow you to:
  *  Type in a query and display a list of 5 books matching that query.
  *  Each item in the list should include the book's author, title, and publishing company.
  *  A user should be able to select a book from the five displayed to save to a “Reading List”
  *  View a “Reading List” with all the books the user has selected from their queries -- this is a local reading list and not tied to Google Books’s account features.

## Implementation

link to implementation: https://javier123454321.github.io/code_challenge/googlebooksapi.html

I chose to do it in JavaScript because of my familiarity with the language specifically in regards to doing asynchronous http requests. I gave the UX, only enough attention to make it functional. I decided to go with a graphic application because it made most sense to me to select the divs with all the info by clicking on them. It did cause me to have to resist the urge to make it more visually appealing at every step. I could not, however, resist making the button clicking more interactive, though it is far from pleasant. One thing that I learned in design school is that it is sometimes better not to design something at all than to design it badly for lack of time. I hope that it doesn't hurt my chances here.

As far as the functionality and reliability, the form was crashing when the user input a string with only spaces, and also when there were no results for the query. Another issue that caused problems at the beginning was having multiple authors per book. I created cases that handled all those exceptions. I imagine there are unforseen circumstances that will still cause an error, but the way it is set up should catch it. 

The reading list feature is stored locally, and therefore resets on browser refresh. I did put a limit on adding the same book to the reading list twice, with an updating title that informs the user.

This was a fun project to write, and my next step would probably be to improve the UX as it is far from being a pleasant thing to interact with. I doubt I will build it into an application with a database with user information and accounts to store it, comments, pictures, ratings, profiles, etc...

Thank you for stopping by, and I hope you enjoy!
