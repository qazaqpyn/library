let conditionWebStorage;
let myLibrary = [];
let storageLib; 
const table= document.querySelector("tbody");
const form = document.querySelector("form");
const btnNew = document.querySelector(".newBook");
const btnAdd = document.querySelector(".addBook")
let na = false;

// Feature-detecting localStorage
//testing for availablity 
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x,x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            //everything except Firefox
            e.code === 22 ||
            //Firefox
            e.code === 1014 ||
            //test name field(code might not be present)
            // everything except Firefox
            e.name==='QuotaExceededError' ||
            // Firefox
            e.name==='NS_ERROR_DOM_QUOTA_REACHED') && 
            (storage&&storage.length !==0);
    }
}


if (storageAvailable('localStorage')) {
    conditionWebStorage = true;
} else {
    conditionWebStorage = false;
} 

if (conditionWebStorage) {
    if (localStorage.length === 0) {
        populateStorage();
    } else {
        setStyles();
    }
} else {
    storageLib = myLibrary;
}

function populateStorage() {
    localStorage.setItem('library',JSON.stringify(myLibrary));
    setStyles();
}

function setStyles(){
    storageLib = localStorage.getItem('library');
    console.log(storageLib);
    myLibrary = JSON.parse(storageLib);
    console.log(myLibrary);
}

function Book(title, author, pages, read) {
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}

function addBookToLibrary(title,author,pages,read) {
    const mybook= new Book(title, author,pages,read);
    myLibrary.push(mybook);
    if (title !== "N/A" && read !== "N/A"){
        localStorage.setItem('library',JSON.stringify(myLibrary));
    } 
   
    console.log(localStorage.getItem('library'));
    refresh();
}

// there's a problem with constructor prototype when working JSON parsed objects

// Book.prototype.toggleRead = function() {
//     console.log(this);
//     if (this.read) {
//         this.read=false;
//     } else {
//         this.read=true;
//     }
// }

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
                localStorage.setItem('library',JSON.stringify(myLibrary));
                refresh();
            })
            changeBtn.addEventListener('click',(e) => {
                console.log(myLibrary[e.target.dataset.rowNumber]);
                // Object.assign(new Book,myLibrary[e.target.dataset.rowNumber]);
                // myLibrary[e.target.dataset.rowNumber].toggleRead();
                if (myLibrary[e.target.dataset.rowNumber].read) {
                    myLibrary[e.target.dataset.rowNumber].read=false;
                } else {
                    myLibrary[e.target.dataset.rowNumber].read=true;
                }
                localStorage.setItem('library',JSON.stringify(myLibrary));
                // console.log(myLibrary[e.target.dataset.rowNumber]);
                refresh();
            })
        }
        // making N/A dissappear when adding new book
        if (na && myLibrary.length > 0) {
            myLibrary.splice(0,1);
            localStorage.setItem('library',JSON.stringify(myLibrary));
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


