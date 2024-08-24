const myLibrary = []; 

function Book(title, author, numPages, isRead) {
  this.title = title; 
  this.author = author; 
  this.numPages = numPages; 
  this.isRead = isRead; 
}
Book.prototype.info = function() {
  let infoString = `${this.title} by ${this.author}, ${this.numPages} pages, `; 
  if(this.isRead) {
    infoString += `read`; 
  } else {
    infoString += `not read`
  }
  return infoString; 
}

function addBookToLibrary(title, author, numPages, isRead) {
  const newBook = new Book(title, author, numPages, isRead); 
  myLibrary.push(newBook); 
}

addBookToLibrary("The College", "Henry Coolidge", 201, false); 
addBookToLibrary("The Calculator", "Jeffrey Mister", 312, true); 
addBookToLibrary("The Book", "Arthur Wright", 452, true); 

const bookCardsSection = document.querySelector("div.bookcards-wrapper"); 

function displayLibrary() {
  for(let i = 0; i < myLibrary.length; ++i) {
    const bookCard = document.createElement("div"); 
    bookCard.classList.add("bookcard"); 
    bookCard.textContent = myLibrary[i].info(); 
    bookCardsSection.insertBefore(bookCard, bookCardsSection.lastElementChild);
  }
}

displayLibrary();