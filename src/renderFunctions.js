let currentQuery = [];
let readingList = [];


const emptyQueryResponse = "<h3>The query matched no books</h3>";

const emptyStringResponse = "<h3>Type something in the search bar to look for books</h3>"

const searchMessage = "<h3>Searching...</h3>";

const reportErrorMessage = "<h3>Invalid Input, Please Try Another Search</h3>"

const emptyReadingListResponse = `<h3>Your Reading List is Empty</h3>
                                    <p>Search for a book and add it to your reading list.</p>`

const readingListTitle = "<h3> Current Reading List:</h3>"

function renderDOMElement(domElement, HTML){
    domElement.innerHTML = HTML;
    }
  
function appendToDOMElement(domElement, HTML){
    domElement.innerHTML += HTML;
    }
function renderDomId(id, html){
    document.getElementById(id).innerHTML = html;
}
function clearDomId(id){
    document.getElementById(id).innerHTML = '';
}

function reportError(){
    renderDomId('heading', reportErrorMessage);
    };

function renderReadingList(){
    renderDomId('heading', readingListTitle);
    document.getElementById("content").innerHTML = "";
        if(readingList.length == 0){
            renderDomId('heading', emptyReadingListResponse);
        }
    
        for (let i = 0; i < readingList.length; i++){
        document.getElementById("content").innerHTML +=
                    `<div class = 'entry' id='${(i+1)}'>`;
                    renderBookInfo('entry', readingList[i], i);
        }
    }

function renderBooksOutput(i, jsonBooks) {
    let divClassName = 'entry'
    
    document.getElementById("content").innerHTML +=

    `<div class = ${divClassName} id='${(i + 1)}'>`;
    renderBookInfo(divClassName, jsonBooks.items[i], i);
    document.getElementsByClassName(divClassName)[i].innerHTML += 
        `<div class='wrapper'>
            <button class='addToReadingList' onclick='addBookToList(${i})'>
            Add Book to Reading List
            </button>
        </div>
    </div>`
    }

function renderBookInfo(className, book, i){
    const authors = book.volumeInfo.authors;
    const title = book.volumeInfo.title;
    const publisher = book.volumeInfo.publisher;

    const entry = document.getElementsByClassName(className);
    
    entry[i].innerHTML += 
    `<h4>${title}</h4>
    <ul>`
    
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
        <li><b>Publisher:</b> ${publisher} </li>
    </ul>
    `;
    };
    
function addToListSuccess(i){
    const message =     
    `<h3>'${currentQuery.items[i].volumeInfo.title}' was added to reading list</h3>
    <p>add another?</p> `;

    renderDomId('heading', message);
}

function reportLoading(query) {
    const message =         
    `<h3>Results for: '${query}'</h3>
    <p>Select entry to add to reading list</p>`

    renderDomId('heading', message);
;
    }

