let myLibrary=[];
const table= document.querySelector("tbody");
const form = document.querySelector("form");
const btnNew = document.querySelector(".newBook");
const btnAdd = document.querySelector(".addBook")
let na = false;

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
    if (myLibrary.length!==0) {
        table.innerHTML='';
        for (let i=0;i<myLibrary.length; i++) {
            const row = document.createElement("tr");
            const nameTd = document.createElement('td');
            const authorTd = document.createElement('td');
            const pagesTd = document.createElement('td');
            const readTd = document.createElement('td');
            const deleteTd = document.createElement("td");
            const changeReadTd = document.createElement("td");
            const changeBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");

            changeBtn.classList.add('th-button');
            deleteBtn.classList.add('th-button');
            deleteBtn.textContent='X';
            changeBtn.textContent='C'
        
    
            nameTd.textContent = myLibrary[i].title;
            authorTd.textContent = myLibrary[i].author;
            pagesTd.textContent = myLibrary[i].pages;
            readTd.textContent = myLibrary[i].read;
            
            changeReadTd.appendChild(changeBtn);
            deleteTd.appendChild(deleteBtn);
            row.append(nameTd,authorTd,pagesTd,readTd,changeReadTd,deleteTd);
            table.appendChild(row);
            changeBtn.dataset.rowNumber = [i];
            deleteBtn.dataset.rowNumber=[i];
    
            deleteBtn.addEventListener('click',(e) => {
                myLibrary.splice(e.target.dataset.rowNumber,1)
                refresh();
            })
            changeBtn.addEventListener('click',(e) => {
                myLibrary[e.target.dataset.rowNumber].toggleRead();
                refresh();
            })
        }
        // making N/A dissappear when adding new book
        if (na && myLibrary.length > 0) {
            myLibrary.splice(0,1);
            na = false;
            refresh();
        }
        // showing N/A when there's no book
    } else {
        addBookToLibrary("N/A", "N/A", "N/A", "N/A");
        na = true;
    }
}


btnAdd.addEventListener("click", () => {
    const addName = document.querySelector("#addName").value;
    const addAuthor = document.querySelector("#addAuthor").value;
    const addPages = document.querySelector("#addPages").value;
    let addRead = document.querySelector("#addRead").value;
    
    if (addName && addAuthor && addPages && addRead) {

        if (addRead==='true') {
            addRead = true;
        } else {
            addRead = false;
        }

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

refresh();
// addBookToLibrary("how","me",123,true);