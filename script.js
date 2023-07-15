import myLibrary from "./books.js";
// ES6 / TypeScript Import
import ShortUniqueId from 'https://esm.sh/short-unique-id';
//Instantiate
const uid = new ShortUniqueId();
const bookCount = document.getElementById("bookCount");
const authorCount = document.getElementById("authorCount");
const pageCount = document.getElementById("pageCount");
const bookGrid = document.querySelectorAll(".book-grid")[0];

function updateDisplay() {
    while (bookGrid.firstChild) {
        bookGrid.firstChild.remove();
    }

    const { bookCount: bookCountValue, authorCount: authorCountValue, pageCount: pageCountValue } = myLibrary.update();

    myLibrary.list.forEach((book,index) => {
        if(!book)return;
        let bookCardTemplate = document.createElement("div");
        bookCardTemplate.classList.add("book-card");
        bookCardTemplate.id = uid()
        myLibrary.list[index].id = bookCardTemplate.id
        bookCardTemplate.style.backgroundImage = book.img ? `url(${book.img})` : "url(Images/book-cover-placeholder.png)";
        bookCardTemplate.innerHTML = `
        <button class="remove">
               X
            </button>
            <div class="book-card-details">
                <ul class="book-card-details-list">
                    <li class="book-card-details-list-item card-text">
                        <span class="book-card-details-list-item-type">Title: </span><span class="book-card-details-list-item-value">${book.title}</span>
                    </li>
                    <li class="book-card-details-list-item card-text">
                        <span class="book-card-details-list-item-type">Author: </span><span class="book-card-details-list-item-value">${book.author}</span>
                    </li>
                    <li class="book-card-details-list-item card-text">
                        <span class="book-card-details-list-item-type">Pages: </span><span class="book-card-details-list-item-value">${book.pages}</span>
                    </li>
                    <li class="book-card-details-list-item card-text">
                        <span class="book-card-details-list-item-type">Read: </span><span class="book-card-details-list-item-value">${book.read ? "Yes" : "No"}</span>
                    </li>
                </ul>
            </div>
        `;
        bookGrid.appendChild(bookCardTemplate);
    });

    bookCount.innerText = bookCountValue;
    authorCount.innerText = authorCountValue;
    pageCount.innerText = pageCountValue;
}

updateDisplay();

function removeBook(e) {
    let book = e.target.closest(".book-card");
    if (!book) return;
  
    let indexToRemove = null;
  
    myLibrary.list.forEach((element, index) => {
        if (element.id !== book.id) return;
        indexToRemove = index;
    });
  
    if (indexToRemove !== null) {
        myLibrary.list.splice(indexToRemove, 1); // Remove the element at the specified index
    }
  
    console.log(myLibrary.list);
    updateDisplay();
}

bookGrid.addEventListener("click",removeBook)