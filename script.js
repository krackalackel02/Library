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

const formTitle = document.querySelector("input#title");
const formAuthor = document.querySelector("input#author");
const formRead = document.querySelector("input#read");
const formImg = document.querySelector("input#img");
const formPages = document.querySelector("input#pages");
formPages.min = 0;
const formAdd = document.querySelector("form button.submit");
const Form = document.querySelector("form");

// Function to reset the form to its initial state
function resetForm() {
	formTitle.value = "";
	formAuthor.value = "";
	formRead.checked = false;
	formImg.value = "";
	formPages.value = "";
	formAdd.innerText = "Add to collection";
	delete formAdd.dataset.bookId; // Remove the bookId attribute
}

// Function to show the popup and determine if it's an edit form or an add book form
function togglePopup() {
	Popup.classList.toggle("active");
	if (Popup.classList.contains("editing")) {
		Popup.classList.remove("editing");
		formAdd.innerText = "Add to collection";
		delete formAdd.dataset.bookId; // Remove the bookId attribute
	}
}

function editBook(book) {
	Popup.classList.toggle("active");
	formTitle.value = book.title;
	formAuthor.value = book.author;
	formRead.checked = book.read;
	formImg.value = book.img;
	formPages.value = book.pages;
	formAdd.innerText = "Edit Book";

	// Store the book object to update after editing
	formAdd.dataset.bookId = book.id;
}
function handleBook(e) {
	let book = e.target.closest(".book-card");
	let removeButton = e.target.closest("button.remove");
	if (!book) return;
	if (!removeButton) {
		// Find the book in myLibrary.list based on its ID
		let bookId = book.id;
		let foundBook = myLibrary.list.find((b) => b.id === bookId);
		if (foundBook) {
			editBook(foundBook);
		}
	} else {
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
}

bookGrid.addEventListener("click", handleBook);
const Popup = document.querySelector(".popup");

let addButton = document.querySelector(".add-book");
addButton.addEventListener("click", () => {
	togglePopup();
	resetForm(); // Reset the form when closing the popup
});

let popupCloseButton = document.querySelector(".popup .remove");
popupCloseButton.addEventListener("click", () => {
	togglePopup();
	resetForm(); // Reset the form when closing the popup
});

formAdd.addEventListener("click", (e) => {
	e.preventDefault();
	if (!Form.checkValidity()) return;

	const bookId = formAdd.dataset.bookId;

	if (bookId) {
		// Editing existing book
		let bookToUpdate = myLibrary.list.find((b) => b.id === bookId);
		if (bookToUpdate) {
			bookToUpdate.title = formTitle.value;
			bookToUpdate.author = formAuthor.value;
			bookToUpdate.pages = parseInt(formPages.value);
			bookToUpdate.img = formImg.value;
			bookToUpdate.read = formRead.checked;
		}
	} else {
		// Adding new book
		const newbook = new Book({
			title: formTitle.value,
			author: formAuthor.value,
			pages: parseInt(formPages.value),
			img: formImg.value,
			read: formRead.checked,
		});
		myLibrary.addBookToLibrary([newbook]);
	}

	updateDisplay();
	togglePopup();
	resetForm(); // Reset the form after submitting
});

function saveBook() {
	localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

let saveButton = document.querySelector(".save-book");
saveButton.addEventListener("click", saveBook);

function clearBook() {
	myLibrary.list = [];
	updateDisplay();
}
let clearButton = document.querySelector(".clear-book");
clearButton.addEventListener("click", clearBook);

function defaultBook() {
	let initBook1 = new Book({
		author: "J K Rowling",
		title: "Harry Potter",
		pages: 200,
		read: false,
		img: "Images/HP1.jpg",
	});
	let initBook2 = new Book({
		author: "John Doe",
		title: "The Adventure Begins",
		pages: 250,
		read: false,
		img: "Images/TAB1.jpg",
	});
	myLibrary.addBookToLibrary([initBook1, initBook2]);

	updateDisplay();
}
let defaultButton = document.querySelector(".default-book");
defaultButton.addEventListener("click", defaultBook);
