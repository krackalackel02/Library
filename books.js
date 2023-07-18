class Library {
	constructor(bookList) {
		if (!bookList) {
			this.list = [];
		} else {
			this.list = bookList;
		}
	}
	addBookToLibrary(books) {
		this.list.push(...books);
	}
	get bookNumber() {
		if (!this.list.length) return 0;
		return this.list.length;
	}
	get authorNumber() {
		let authorCollection = [];
		if (!this.list.length) return 0;
		this.list.forEach((book) => {
			authorCollection.includes(book.author)
				? undefined
				: authorCollection.push(book.author);
		});
		return authorCollection.length;
	}
	get pagesRead() {
		let pages = 0;
		if (!this.list.length) return 0;
		this.list.forEach((book) => {
			book.read ? (pages += book.pages) : undefined;
		});
		return pages;
	}
	update() {
		return {
			bookCount: this.bookNumber,
			authorCount: this.authorNumber,
			pageCount: this.pagesRead,
		};
	}
}

export class Book {
	constructor(book) {
		this.author = book.author;
		this.title = book.title;
		this.pages = book.pages;
		this.read = book.read;
		this.img = book.img;
	}
}

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
let storedLib = JSON.parse(localStorage.getItem("myLibrary"));
let myLibrary = storedLib
	? new Library(storedLib.list)
	: new Library([initBook1, initBook2]);
export default myLibrary;
