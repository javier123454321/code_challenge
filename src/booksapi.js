function loadBooks(){
  //Loading the books using an async call
  let query = document.getElementById("query").value;

  if (query == "") {
    renderDomId('heading', emptyStringResponse)
    return null
  }

  clearDomId('query');

  let formattedQuery = formatQuery(query);
  reportLoading(query);
  makeGoogleBooksHTTPRequest(formattedQuery);
  }

function makeGoogleBooksHTTPRequest(formattedQuery) {
  const baseURL = "https://www.googleapis.com/books/v1/volumes?q=" + formattedQuery;
  const xhr = new XMLHttpRequest();

  clearDomId('content');
  renderDomId('heading', searchMessage);
  xhr.onload = function () {
    if (this.status == 200) {
      currentQuery = (JSON.parse(this.responseText));
      getNItems(currentQuery, 5);
    }
    else {
      reportError();
    }
  }; //it can load but is not a valid search
  xhr.onerror = function () {
    reportError();
  };
  xhr.open("GET", baseURL, true);

  xhr.timeout = 2000;
  xhr.ontimeout = function(){
    renderDomId('heading', "<h3>This took longer than expected, maybe try another search</h3>")
  }

  xhr.send();
}

function getNItems(jsonBooks, num){
  clearDomId('heading');
  clearDomId('content');
  //Print the first 5 query items
  if (jsonBooks.totalItems != 0){
      const listLength = jsonBooks.items.length;
      for (let i = 0; i < listLength; i++) {
        if(i == num){break};
        renderBooksOutput(i, jsonBooks);
        };

  }else{    
    renderDomId('heading', emptyQueryResponse);
    };
  }

function formatQuery(query){
  //The only special character not allowed is the plus (+) sign 
  //which would the api will  interpret as different search terms
  let formattedQuery = query.trim();
  formattedQuery = formattedQuery.replace(/[+]/g, '');
  formattedQuery = formattedQuery.replace(/\s/g, "+");
  return formattedQuery;
}

function addBookToList(i){
  window.scrollTo(0,0);

  if (!isBookInList(currentQuery.items[i], readingList)){
    readingList.unshift(currentQuery.items[i]);
    addToListSuccess(i);
  }else{
    document.getElementById("heading").innerHTML =
        `<h3>'${currentQuery.items[i].volumeInfo.title}' is already on the reading list</h3>`
  }
}

function isBookInList(book, readingList){
  if(readingList.length == 0){return false};

  for(let i = 0; i < readingList.length; i++){
    if(book.volumeInfo == readingList[i].volumeInfo){
      return true;
    }
  }
}

module.exports = {
  isBookInList, 
  formatQuery,
};
