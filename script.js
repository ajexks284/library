const addBookBtn = document.getElementById('addBook');
const modalBg = document.getElementById('modalBg');
const modal = document.getElementById('modal');
const form = document.getElementById('form');
const addTitle = document.getElementById('addTitle');
const addAuthor = document.getElementById('addAuthor');
const addPages = document.getElementById('addPages');
const isRead = document.getElementById('isRead');
const submitBookBtn = document.getElementById('submitBook');
const bookSection = document.getElementById('bookSection');

let myLibrary = [];

// Book Class
class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    changeReadStatus() {
        this.read = !this.read;
    }
}

// Functions
function addBookToLibrary() {
    let book = new Book(addTitle.value, addAuthor.value, addPages.value, isRead.checked);
    myLibrary.push(book);
}

function renderBooks() {
    myLibrary.forEach(book => {
        let bookDiv = document.createElement('div');
        bookDiv.classList.add('book');
        bookDiv.classList.add(`${book.read ? 'read' : 'not-read'}`);
        bookSection.appendChild(bookDiv);

        let titleDiv = document.createElement('div');
        titleDiv.appendChild(document.createTextNode(`${book.title}`));
        bookDiv.appendChild(titleDiv);

        let authorDiv = document.createElement('div');
        authorDiv.appendChild(document.createTextNode(`By: ${book.author}`));
        bookDiv.appendChild(authorDiv);

        let pagesDiv = document.createElement('div');
        pagesDiv.appendChild(document.createTextNode(`Number of pages: ${book.pages}`));
        bookDiv.appendChild(pagesDiv);

        let markAsReadDiv = document.createElement('div');
        markAsReadDiv.classList.add('mark-as-read-div');
        let markAsReadText = document.createTextNode('Mark as read:')
        markAsReadDiv.appendChild(markAsReadText);

        let readSpan = document.createElement('span');
        readSpan.addEventListener('click', (e) => {
            updateReadStatus(e);
        });
        readSpan.classList.add('read-status-span');
        readSpan.classList.add(`${book.read ? 'read' : 'not-read'}`); // for styling
        markAsReadDiv.appendChild(readSpan);

        bookDiv.appendChild(markAsReadDiv);

        let removeBtn = document.createElement('span');
        removeBtn.addEventListener('click', (e) => {
            removeBook(e);
        });
        removeBtn.classList.add('remove-btn');
        bookDiv.appendChild(removeBtn);
    })
}

function updateReadStatus(e) {
    let bookIndex = [...bookSection.children].indexOf(e.target.parentElement.parentElement);
    myLibrary[bookIndex].changeReadStatus();

    if (e.target.classList.contains('read')) {
        e.target.classList.remove('read');
        e.target.classList.add('not-read');
        e.target.parentElement.parentElement.classList.remove('read');
        e.target.parentElement.parentElement.classList.add('not-read');
    } else {
        e.target.classList.remove('not-read');
        e.target.classList.add('read');
        e.target.parentElement.parentElement.classList.remove('not-read');
        e.target.parentElement.parentElement.classList.add('read');
    }

    saveLibrary();
}

function removeBook(e) {
    //Remove book from array
    let bookIndexToRemove = [...bookSection.children].indexOf(e.target.parentElement);
    myLibrary.splice(bookIndexToRemove, 1);

    //Remove book from DOM
    bookSection.removeChild(e.target.parentElement);

    saveLibrary();
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
        saveLibrary();
        bookSection.innerHTML = '';
        renderBooks();
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
});

window.addEventListener('click', (e) => {
    if (e.target == modalBg) {
        modalBg.style.display = 'none';
        form.reset();
    }
});

// LOCAL STORAGE
function saveLibrary() {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

function getLibrary() {
    if (localStorage.getItem('library')) {
        myLibrary = JSON.parse(localStorage.getItem('library'))
        myLibrary.forEach(obj => {
            obj.__proto__ = Object.create(Book.prototype);
        });
    }
    renderBooks();
}

getLibrary();