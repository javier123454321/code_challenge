class Books{
  constructor(json){
    this.books = json;
    this.readingList = [];
  }
  function (params) {
    //
  }
}

const emptyQueryResponse = "<h3>The query matched no books</h3>";
const searchMessage = "<h3>Searching...</h3>";

function renderDOMElement(domElement, HTML){
  domElement.innerHTML = HTML;
}

function appendToDOMElement(domElement, HTML){
  domElement.innerHTML += HTML;
}

let currentQuery = [];
let readingList = [];

document.getElementById("searchBooksForm").addEventListener('submit', e => {
    loadBooks();
    // Prevent the default form submit
    e.preventDefault();
});

document.getElementById("readingListButton").addEventListener('click', e => {
  showReadingList(readingList);
})

function isQueryEmpty(query){
  document.getElementById("query").value = "";
}

function formatQuery(query){
  
  //The only special character not allowed is the plus (+) sign which would the api will  interpret as different search terms
  let formattedQuery = query.trim();
  formattedQuery = formattedQuery.replace(/[+]/g, '');
  formattedQuery = formattedQuery.replace(/\s/g, "+");
  return formattedQuery;
}

function loadBooks() {
  //Loading the books using an async call
  let query = document.getElementById("query").value;
  document.getElementById("query").value = "";

  let formattedQuery = formatQuery(query);
  makeGoogleBooksHTTPRequest(formattedQuery, query);
  }

function makeGoogleBooksHTTPRequest(formattedQuery, query) {
  if (formattedQuery != "") {
    //makes sure that the user cannot put an empty string to the search bar which produces a 400 error
    const baseURL = "https://www.googleapis.com/books/v1/volumes?q=" + formattedQuery;
    const xhr = new XMLHttpRequest();

    document.getElementById("content").innerHTML = "";
    renderDOMElement(document.getElementById('heading'), searchMessage)
    xhr.onload = function () {
      if (this.status == 200) {
        currentQuery = (JSON.parse(this.responseText));
        
        getNItems(currentQuery, 5);
        addButtonListener(currentQuery);

        document.getElementById('heading').innerHTML =
          `<h3>Results for: '${query}'</h3>
          <p>Select entry to add to reading list</p>`;
      }
      else {
        reportError();
      }
    }; //it can load but not be a valid search
    xhr.onerror = function () {
      reportError();
    };
    xhr.open("GET", baseURL, true);
    xhr.send();
  }
}

function getNItems(jsonBooks, num){
  document.getElementById('heading').innerHTML = "";
  document.getElementById("content").innerHTML = "";
  //Print the first 5 query items
  if (jsonBooks.totalItems != 0){
      const listLength = jsonBooks.items.length;
      for (let i = 0; i < listLength; i++) {
        if(i == num){break};

        renderBooksOutput(i, jsonBooks);
        };

  }else{    
    renderDOMElement(document.getElementById('heading'), emptyQueryResponse)
    };
  }

function renderBooksOutput(i, jsonBooks) {

  document.getElementById("content").innerHTML +=
    `<div class = 'entry' id='${(i + 1)}'>
    <h3>Entry " + (i + 1) + "</h3>`;

  printBookInfo(jsonBooks.items[i], i);
}

function printBookInfo(book, i){
  //  Format how book items are displayed for user input
  const authors = book.volumeInfo.authors;
  const title = book.volumeInfo.title;
  const publisher = book.volumeInfo.publisher;
  let entry = document.getElementsByClassName("entry");
  
  if (authors != undefined){
    
    for(let j in authors){
      entry[i].innerHTML +=
        `<li><b>Author:</b> ${authors[j]}</li>`;
    }
  }else{
    entry[i].innerHTML +=
      "<li><b>Author:</b> None </li>";
    }
  entry[i].innerHTML +=
  `
  <li><b>Title:</b> ${title} </li> 
  <li><b>Publisher:</b> ${publisher} </li>
  </ul> 
  <button class='addToReadingList' onclick='addBookToList(book)'>
  Add Book to List
  </button>
  </div>`;
};

function reportError(){
  document.getElementById('heading').innerHTML =
              "<h3>Invalid Input, Please Try Another Search</h3>";
};

function addButtonListener(jsonBooks){
  //TODO
}

function addBookToList(jsonBooks){
  const buttons = document.querySelectorAll("button.addToReadingList")
  const elementNumber = (this.id -1);
  if (!isBookInList(jsonBooks.items[elementNumber], readingList)){
    readingList.unshift(jsonBooks.items[elementNumber]);
    document.getElementById("heading").innerHTML =
        `<h3>'${jsonBooks.items[elementNumber].volumeInfo.title}' was added to reading list</h3>
        <p>add another?</p> `;
  }else{
    document.getElementById("heading").innerHTML =
        `<h3>'${jsonBooks.items[elementNumber].volumeInfo.title}' is already on the reading list</h3>`

  }
}

function isBookInList(book, readingList){
  if(readingList.length == 0){return false};
  //checks if a book is in already in the readingList
  for(let i = 0; i < readingList.length; i++){
    if(book.volumeInfo == readingList[i].volumeInfo){
      return true;
    }
  }
}

function showReadingList(list){
  document.getElementById('heading').innerHTML = "<h3> Current Reading List:</h3>";
  document.getElementById("content").innerHTML = "";
  if(list.length == 0){document.getElementById('heading').innerHTML =
      `<h3>Your Reading List is Empty</h3>
      <p>Search for a book and add it to your reading list.</p>`;
    }

  for (let i = 0; i < list.length; i++){
    document.getElementById("content").innerHTML +=
              `
              <div class = 'entry' id='${(i+1)}'>
              <h3>Reading List Item ${(i+1)}</h3>`;
    printBookInfo(list[i], i);
  }
}
