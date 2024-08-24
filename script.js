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
    infoString += `has been read.`; 
  } else {
    infoString += `not read yet.`
  }
  return infoString; 
}

function addBookToLibrary(title, author, numPages, isRead) {
  const newBook = new Book(title, author, numPages, isRead); 
  myLibrary.push(newBook); 
}