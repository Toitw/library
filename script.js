// Define book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

// Initialize an array to store books
let myLibrary = [];

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

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    // Toggle read status
    const toggleRead = document.getElementById('read');
    const toggleLabel = document.querySelector('.toggle-label');

    toggleRead.style.display = 'none';
    toggleLabel.addEventListener('click', () => {
    toggleRead.checked = !toggleRead.checked;
    newBook.read = toggleRead.checked;
    toggleLabel.classList.toggle('checked');
  });
    
    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;

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
            <p>${book.read ? 'Read' : 'Not Read'}</p>
            <button onclick="toggleReadStatus(${index})">Toggle Read Status</button>
        `;
        bookList.appendChild(bookCard);
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
