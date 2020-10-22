let myLibrary=[];
const table= document.querySelector("tbody");
const form = document.querySelector("form");
const btnNew = document.querySelector(".newBook");
const btnAdd = document.querySelector(".addBook")


function Book(title, author, pages, read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary(title,author,pages,read) {
    const mybook= new Book(title, author,pages,read);
    myLibrary.push(mybook);
    refresh();
}

Book.prototype.toggleRead = function() {
    if (this.read) {
        this.read=false;
    } else {
        this.read=true;
    }
}

//TODO: for looping over
function refresh() {
    table.innerHTML='';
    for (let i=0;i<myLibrary.length; i++) {
        const row = document.createElement("tr");
        const nameTd = document.createElement('td');
        const authorTd = document.createElement('td');
        const pagesTd = document.createElement('td');
        const readTd = document.createElement('td');
        const deleteTd = document.createElement("td");
        const deleteBtn = document.createElement("button");

        nameTd.textContent = myLibrary[i].title;
        authorTd.textContent = myLibrary[i].author;
        pagesTd.textContent = myLibrary[i].pages;
        readTd.textContent = myLibrary[i].read;
        
        deleteTd.appendChild(deleteBtn);
        row.append(nameTd,authorTd,pagesTd,readTd,deleteTd);
        table.appendChild(row);
        deleteBtn.dataset.rowNumber=[i];

        deleteBtn.addEventListener('click',(e) => {
            myLibrary.splice(e.target.dataset.rowNumber,1)
            refresh();
        })

    }
}


btnAdd.addEventListener("click", () => {
    const addName = document.querySelector("#addName").value;
    const addAuthor = document.querySelector("#addAuthor").value;
    const addPages = document.querySelector("#addPages").value;
    const addRead = document.querySelector("#addRead").value;
    if (addName && addAuthor && addPages && addRead) {
        addBookToLibrary(addName, addAuthor, addPages, addRead);
        form.reset()
        form.classList.remove('nothidden');
        form.classList.add("hidden");
    }

})



btnNew.addEventListener("click", () => {
    if (form.classList.contains("hidden")) {
        form.classList.remove("hidden");
        form.classList.add("nothidden");
    } else {
        form.classList.remove("nothidden");
        form.classList.add("hidden");
    }
}) 


addBookToLibrary("how","me",123,true);