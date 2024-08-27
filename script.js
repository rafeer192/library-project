const myLibrary = []; 

function Book(title, author, numPages, isRead) {
  this.title = title; 
  this.author = author; 
  this.numPages = numPages; 
  this.isRead = isRead; 
}
Book.prototype.info = function() {
  let infoString = `"${this.title}" \nby \n${this.author} \n${this.numPages} pages\n`; 
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

const bookCardsSection = document.querySelector("div.bookcards-wrapper"); 

function createCard(index) {  // creates a book card DOM element based off the book object's index in the library array
  const bookCard = document.createElement("div"); 
  bookCard.classList.add("bookcard"); 
  bookCard.setAttribute("data-index", index);     // !add a data attribute to correspond DOM placement w array placement
  const bookText = document.createElement("p"); 
  bookText.textContent = myLibrary[index].info();
  bookCard.appendChild(bookText);
  const deleteBtn = document.createElement("button"); 
  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Remove"; 
  deleteBtn.addEventListener("click", deleteHandler); 
  bookCard.appendChild(deleteBtn);
  const readBtn = document.createElement("button"); 
  readBtn.classList.add("read-btn"); 
  if(myLibrary[index].isRead) {
    readBtn.textContent = "Not read"; 
    readBtn.classList.add("not-read"); 
  } else {
    readBtn.textContent = "Read"; 
    readBtn.classList.add("read"); 
  }
  readBtn.addEventListener("click", readHandler); 
  bookCard.appendChild(readBtn);
  const favBtn = document.createElement("a"); 
  const starIcon = document.createElement("img"); 
  favBtn.classList.add("fav-btn");
  starIcon.src = "./images/star-outline.svg"; 
  starIcon.alt = "A star meant to add this book to your favorites"; 
  favBtn.appendChild(starIcon);
  favBtn.addEventListener("click", favHandler); 
  bookCard.appendChild(favBtn);
  return bookCard; 
}

function displayLibrary() {
  for(let i = 0; i < myLibrary.length; ++i) {
    bookCardsSection.insertBefore(createCard(i), bookCardsSection.lastElementChild);
  }
}

function deleteHandler(event) { // will delete from both array of book objects and DOM
  myLibrary.splice(event.target.parentElement.dataset.index, 1);
  bookCardsSection.removeChild(event.target.parentElement);
}

function readHandler(event) {
  const bookText = event.target.parentElement.firstChild; // p element w book info is first child always
  if(event.target.classList.contains("read")) {
    event.target.classList.remove("read"); 
    event.target.classList.add("not-read"); 
    event.target.textContent = "Not read";
    myLibrary[event.target.parentElement.dataset.index].isRead = true; 
  } else if(event.target.classList.contains("not-read")) {
    event.target.classList.remove("not-read"); 
    event.target.classList.add("read"); 
    event.target.textContent = "Read";
    myLibrary[event.target.parentElement.dataset.index].isRead = false; 
  }
  bookText.textContent = myLibrary[event.target.parentElement.dataset.index].info(); // update book info text
}

function favHandler(event) {
  if(!event.target.classList.contains("favorited")) {
    const starFilledIcon = document.createElement("img"); 
    starFilledIcon.src = "./images/star.svg"; 
    starFilledIcon.alt = "A star showing that this book has been added to favorites"; 
    starFilledIcon.classList.add("favorited"); 
    event.target.parentElement.replaceChild(starFilledIcon, event.target);
  } else {
    const starIcon = document.createElement("img"); 
    starIcon.src = "./images/star-outline.svg"; 
    starIcon.alt = "A star meant to add this book to your favorites"; 
    event.target.parentElement.replaceChild(starIcon, event.target); 
  }
}

const addBtn = document.querySelector(".add-card > button");
const addDialog = document.querySelector(".add-card dialog");
const cancelBtn = document.querySelector("dialog form button.cancel"); 
const confirmBtn = document.querySelector(`dialog form button[type="submit"]`);
const addForm = document.querySelector(".add-card dialog > form"); 

addBtn.addEventListener("click", () => {
  addDialog.showModal();
}); 

cancelBtn.addEventListener("click", () => {
  addForm.reset();
  addDialog.close();
});

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const bookData = new FormData(addForm);
  console.log(Object.fromEntries(bookData));
  console.log(bookData.get("book-title"));
  addBookToLibrary( bookData.get("book-title"), bookData.get("book-author"), 
                   Number(bookData.get("book-pages")), Boolean(bookData.get("read-status")) );
  const newBookCard = createCard(myLibrary.length-1); 
  bookCardsSection.insertBefore(newBookCard, bookCardsSection.lastElementChild);
  addForm.reset();
  addDialog.close();
}); 



addBookToLibrary("The College", "Henry Coolidge", 201, false); 
addBookToLibrary("The Calculator", "Jeffrey Mister", 312, true); 
addBookToLibrary("The Book", "Arthur Wright", 452, true); 
displayLibrary();
