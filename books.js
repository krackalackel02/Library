class Library {
    constructor (bookList){
        if (!bookList) {
            this.list = [];
        }else{
            this.list = bookList
        }
    }
    addBookToLibrary(books) {
        this.list.push(...books)
    }
    get bookNumber(){
        if (!this.list.length)return 0;
        return this.list.length
    }
    get authorNumber(){
        let authorCollection = [];
        if (!this.list.length)return 0;
        this.list.forEach(book => {
            authorCollection.includes(book.author)?undefined: authorCollection.push(book.author)
        });
        return authorCollection.length
    }
    get pagesRead(){
        let pages = 0;
        if (!this.list.length)return 0;
        this.list.forEach(book => {
            book.read?pages+=book.pages:undefined
        });
        return pages
    }
    update(){
        return {
            bookCount:this.bookNumber,
            authorCount:this.authorNumber,
            pageCount:this.pagesRead
        }
    }
}

let myLibrary = new Library()

class Book {
    constructor  (book){
        this.author = book.author
        this.title = book.title
        this.pages = book.pages
        this.read = book.read
    }
}

let initBook1 = new Book(
    {
        author:'J K Rowling',
        title:'Harry Potter',
        pages:200,
        read:false,
    }
)
let initBook2 = new Book(
    {
        author:'J K Rowling',
        title:'Harry Potter 2',
        pages:300,
        read:true,
    }
)

myLibrary.addBookToLibrary([initBook1,initBook2])


export default myLibrary