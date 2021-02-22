const addBookBtn = document.getElementById('addBook');
const modalBg = document.getElementById('modalBg');
const modal = document.getElementById('modal');
const form = document.getElementById('form');
const addTitle = document.getElementById('addTitle');
const addAuthor = document.getElementById('addAuthor');
const addPages = document.getElementById('addPages');
const isRead = document.getElementById('isRead');
const submitBookBtn = document.getElementById('submitBook');

let myLibrary = [];

// Functions
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {
    let book = new Book(addTitle.value, addAuthor.value, addPages.value, isRead.checked);
    myLibrary.push(book);
}

const bookSection = document.getElementById('bookSection');
function createBooks() {
    myLibrary.forEach((book, index) => {
        let bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookSection.appendChild(bookDiv);


        let titleDiv = document.createElement('div');
        titleDiv.appendChild(document.createTextNode(`Title: "${book.title}"`));
        bookDiv.appendChild(titleDiv);

        let authorDiv = document.createElement('div');
        authorDiv.appendChild(document.createTextNode(`Author: ${book.author}`));
        bookDiv.appendChild(authorDiv);

        let pagesDiv = document.createElement('div');
        pagesDiv.appendChild(document.createTextNode(`Pages: ${book.pages}`));
        bookDiv.appendChild(pagesDiv);

        let readDiv = document.createElement('div');
        readDiv.appendChild(document.createTextNode(`Read: ${book.read ? 'yes' : 'no'}`));
        bookDiv.appendChild(readDiv);

        let removeBtn = document.createElement('button');
        removeBtn.addEventListener('click', (e) => {
            removeBook(e);
        });
        removeBtn.appendChild(document.createTextNode('Remove'));
        removeBtn.classList.add('remove-btn');
        bookDiv.appendChild(removeBtn);
    })
}

function removeBook(e) {
    //Remove book from array
    let bookIndexToRemove = [...bookSection.children].indexOf(e.target.parentElement);
    myLibrary.splice(bookIndexToRemove, 1);

    //Remove book from DOM
    bookSection.removeChild(e.target.parentElement);
}

function checkForDuplicateBook() {
    let isDuplicate = false;

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === addTitle.value && myLibrary[i].author === addAuthor.value) {
            isDuplicate = true;
            break;
        }
    }

    return isDuplicate;
}

// Event Listeners
form.addEventListener('submit', () => {

    if (!checkForDuplicateBook()) {
        addBookToLibrary();
        bookSection.innerHTML = '';
        createBooks();
    } else {
        alert('This book already exists!');
    }

    // reset form
    form.reset();
    modalBg.style.display = 'none';
});

// modal events
addBookBtn.addEventListener('click', () => {
    modalBg.style.display = 'block';
})

window.addEventListener('click', (e) => {
    if (e.target == modalBg) {
        modalBg.style.display = 'none';
        form.reset();
    }
})