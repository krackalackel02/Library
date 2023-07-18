import myLibrary, { Book } from "./books.js"; // ES6 / TypeScript Import
import ShortUniqueId from "https://esm.sh/short-unique-id";
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

	const {
		bookCount: bookCountValue,
		authorCount: authorCountValue,
		pageCount: pageCountValue,
	} = myLibrary.update();

	myLibrary.list.forEach((book, index) => {
		if (!book) return;
		let bookCardTemplate = document.createElement("div");
		bookCardTemplate.classList.add("book-card");
		bookCardTemplate.id = uid();
		myLibrary.list[index].id = bookCardTemplate.id;
		bookCardTemplate.style.backgroundImage = book.img
			? `url(${book.img})`
			: "url(Images/book-cover-placeholder.png)";
		bookCardTemplate.innerHTML = `
        <button class="remove">
               X
            </button>
            <div class="book-card-details">
                <ul class="book-card-details-list">
                    <li class="book-card-details-list-item card-text">
                        <span class="book-card-details-list-item-type">Title: </span><span class="book-card-details-list-item-value">${
													book.title
												}</span>
                    </li>
                    <li class="book-card-details-list-item card-text">
                        <span class="book-card-details-list-item-type">Author: </span><span class="book-card-details-list-item-value">${
													book.author
												}</span>
                    </li>
                    <li class="book-card-details-list-item card-text">
                        <span class="book-card-details-list-item-type">Pages: </span><span class="book-card-details-list-item-value">${
													book.pages
												}</span>
                    </li>
                    <li class="book-card-details-list-item card-text">
                        <span class="book-card-details-list-item-type">Read: </span><span class="book-card-details-list-item-value">${
													book.read ? "Yes" : "No"
												}</span>
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
	let removeButton = e.target.closest("button.remove");
	if (!removeButton) return;

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

bookGrid.addEventListener("click", removeBook);
const Popup = document.querySelector(".popup");

function addBook(e) {
	Popup.classList.toggle("active");
}
let addButton = document.querySelector(".add-book");
addButton.addEventListener("click", addBook);
let popupCloseButton = document.querySelector(".popup .remove");
popupCloseButton.addEventListener("click", addBook);

const formTitle = document.querySelector("input#title");
const formAuthor = document.querySelector("input#author");
const formRead = document.querySelector("input#read");
const formImg = document.querySelector("input#img");
const formPages = document.querySelector("input#pages");
formPages.min = 0;
const formAdd = document.querySelector("form button.submit");
const Form = document.querySelector("form");

formAdd.addEventListener("click", (e) => {
	e.preventDefault();
	if (!Form.checkValidity()) return; // Fix: use Form.checkValidity() instead of Form.valid

	const newbook = new Book({
		title: formTitle.value,
		author: formAuthor.value,
		pages: parseInt(formPages.value), // Convert to a numeric value
		img: formImg.value, // Convert to a numeric value
		read: formRead.checked, // Use the checked property to get a boolean value
	});

	myLibrary.addBookToLibrary([newbook]);
	updateDisplay();
    addBook()
});

function saveBook() {
	localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

let saveButton = document.querySelector(".save-book");
saveButton.addEventListener("click", saveBook);
