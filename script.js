// Define book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Initialize an array to store books
let myLibrary = [];


// Toggle read status modal
const toggleLabel = document.querySelector('.toggle-label');

toggleLabel.addEventListener('click', () => {
const toggleInput = document.querySelector('.toggle-input');
    toggleLabel.classList.toggle('checked');
    toggleInput.checked = !toggleInput.checked;
}
);


// Remove padding when there are no books
function render() {
    const bookList = document.querySelector('.book-list');
    bookList.innerHTML = '';
  
    if (myLibrary.length === 0) {
      bookList.classList.remove('has-books');
      return;
    }
  
    bookList.classList.add('has-books');
    myLibrary.forEach(book => renderBook(book));
}



// Function to add a new book
function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const toggleLabel = document.querySelector('.toggle-label');
    const toggleInput = document.querySelector('.toggle-input');    
  
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
  
    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
    toggleLabel.classList.remove('checked');
  
    // Close the modal
    closeModal();
  
    // Update the book list
    displayBooks();
  }

// Function to display books
function displayBooks() {
    const bookList = document.querySelector('.book-list');
    bookList.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
            <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
            <button class="delete-book">Delete</button>
        `;
        bookList.appendChild(bookCard);

        const deleteButton = bookCard.querySelector('.delete-book');
        deleteButton.addEventListener('click', () => {
            deleteBook(book);
            bookCard.remove();
        });
    });
}

// Function to toggle read status
function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read;
    displayBooks();
}

// Function to delete a book
function deleteBook(book) {
    const bookIndex = myLibrary.indexOf(book);
    myLibrary.splice(bookIndex, 1);
}

// Open the modal
document.getElementById('add-book-btn').addEventListener('click', () => {
    document.getElementById('add-modal').style.display = 'block';
});

// Close the modal
function closeModal() {
    document.getElementById('add-modal').style.display = 'none';
}

// Event listener for adding a new book
document.getElementById('add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
});

// Initial display of books
displayBooks();
