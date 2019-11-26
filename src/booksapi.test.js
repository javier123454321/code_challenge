const { isBookInList, formatQuery } = require('./booksapi');

test ('Checks if a book is in a list of books', () => {
    expect(isBookInList({'volumeInfo': 'book'}, [{'volumeInfo': 'book'}]))
})

test ('isBookInList should be false when a book is not on a list', () =>{
    const book = {'volumeInfo': 'Narnia'};
    const list = [
            {'volumeInfo': 'Narnio'},
            {'volumeInfo': 'Narniu'}
        ];
    expect(!isBookInList(book, list))
})

test ('Checks if a query string is formatted correctly', () => {
    const query = 'the madness of the seven seas';
    const expectedQuery = 'the+madness+of+the+seven+seas';
    expect(formatQuery(query)).toBe(expectedQuery)
})


