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

addBookToLibrary("The College", "Henry Coolidge", 201, false); 
addBookToLibrary("The Calculator", "Jeffrey Mister", 312, true); 
addBookToLibrary("The Book", "Arthur Wright", 452, true); 

const bookCardsSection = document.querySelector("div.bookcards-wrapper"); 

function displayLibrary() {
  for(let i = 0; i < myLibrary.length; ++i) {
    const bookCard = document.createElement("div"); 
    bookCard.classList.add("bookcard"); 
    const bookText = document.createElement("p"); 
    bookText.textContent = myLibrary[i].info();
    bookCard.appendChild(bookText);
    const deleteBtn = document.createElement("button"); 
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Remove"; 
    bookCard.appendChild(deleteBtn);
    const readBtn = document.createElement("button"); 
    readBtn.classList.add("read-btn"); 
    if(myLibrary[i].isRead) {
      readBtn.textContent = "Not read"; 
      readBtn.classList.add("not-read"); 
    } else {
      readBtn.textContent = "Read"; 
      readBtn.classList.add("read"); 
    }
    bookCard.appendChild(readBtn);
    const favBtn = document.createElement("a"); 
    const starIcon = document.createElement("img"); 
    favBtn.classList.add("fav-btn");
    starIcon.src = "./images/star-outline.svg"; 
    starIcon.height = 25;
    starIcon.alt = "A star used to favorite books"; 
    favBtn.appendChild(starIcon); 
    bookCard.appendChild(favBtn);
    bookCardsSection.insertBefore(bookCard, bookCardsSection.lastElementChild);
  }
}

displayLibrary();