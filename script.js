let myLibrary=[];

book3= new Book("iam", "2020", 232, true);
myLibrary.push(book3);
function Book(title, author, pages, read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary() {
    let title = prompt("Title of the book:");
    let author= prompt("author of the book: ");
    let pages = prompt("pages of the book: ");
    let readYN = prompt("did you read that book? (y/n)");
    let read;

    if (readYN === "y" ){
        read=true;
    } else {
        read = false;
    }

    const mybook= new Book(title, author,+pages,read);
    myLibrary.push(mybook);
}


const table= document.querySelector("table");

myLibrary.forEach((item) => {
    let tr = document.createElement('tr'); 
    for( let i in item) {
        let td = document.createElement('td');
        td.textContent = item[i];
        tr.appendChild(td);
    }
    table.appendChild(tr);
})
