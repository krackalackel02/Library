import myLibrary from "./books.js";

const bookCount = document.getElementById("bookCount");
const authorCount = document.getElementById("authorCount");
const pageCount = document.getElementById("pageCount");

function update() {
    const { bookCount: bookCountValue, authorCount: authorCountValue, pageCount: pageCountValue } = myLibrary.update();
    
    bookCount.innerText = bookCountValue;
    authorCount.innerText = authorCountValue;
    pageCount.innerText = pageCountValue;
}
update()
