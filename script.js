class Book {
    constructor(title, author, pages, read) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.read = read;
    }
  }
  
  class Library {
    constructor() {
      this.books = [];
    }
  
    addBook(book) {
      this.books.push(book);
    }
  
    removeBook(book) {
      const index = this.books.indexOf(book);
      if (index !== -1) {
        this.books.splice(index, 1);
      }
    }
  
    toggleReadStatus(book) {
      book.read = !book.read;
    }
  
    render() {
      const bookList = document.querySelector('.book-list');
      bookList.innerHTML = '';
  
      if (this.books.length === 0) {
        bookList.classList.remove('has-books');
        return;
      }
  
      bookList.classList.add('has-books');
      this.books.forEach((book) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
          <h3>${book.title}</h3>
          <p>Author: ${book.author}</p>
          <p>Pages: ${book.pages}</p>
          <p>Status: ${book.read ? 'Read' : 'Not Read'}</p>
          <button class="toggle-read-status">Toggle Read Status</button>
          <button class="delete-book">Delete</button>
        `;
        bookList.appendChild(bookCard);
  
        const toggleReadStatusButton = bookCard.querySelector('.toggle-read-status');
        toggleReadStatusButton.addEventListener('click', () => {
          this.toggleReadStatus(book);
          this.render();
        });
  
        const deleteButton = bookCard.querySelector('.delete-book');
        deleteButton.addEventListener('click', () => {
          this.removeBook(book);
          bookCard.remove();
            this.render();
        });
      });
    }
  }
  
  const library = new Library();
  
  // Open the modal
  document.getElementById('add-book-btn').addEventListener('click', () => {
    document.getElementById('add-modal').style.display = 'block';
  });
  
  // Close the modal
  function closeModal() {
    document.getElementById('add-modal').style.display = 'none';
  }

  //Read toggle in the modal
  document.querySelector('.toggle-label').addEventListener('click', () => {
    document.querySelector('.toggle-label').classList.toggle('checked');
  });
  
  // Event listener for adding a new book
  document.getElementById('add-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const newBook = new Book(title, author, pages, read);
    library.addBook(newBook);
  
    // Clear form fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').checked = false;
    document.querySelector('.toggle-label').classList.remove('checked');
  
    // Close the modal
    closeModal();
  
    // Update the book list
    library.render();
});
  
  // Initial display of books
  library.render();