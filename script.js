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


// Event Listeners
form.addEventListener('submit', () => {
    addBookToLibrary();

    // reset form after adding book
    form.reset();
    modalBg.style.display = 'none'
});

// modal events
addBookBtn.addEventListener('click', () => {
    modalBg.style.display = 'block';
})

window.addEventListener('click', (e) => {
    if (e.target == modalBg) {
        modalBg.style.display = 'none';
    }
})