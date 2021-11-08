let myLibrary = [];
let newBook;
const form = document.getElementById('inputForm');

//book constructor
class Book {
    constructor(title, author, pages, read){
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
};

//dummy book
/* const bookOne = new Book('A Tale of Two Cities', 'Charles Dickens', '567', 'true');
myLibrary.push(bookOne); */

//read the radio buttons
var readStatus = '';
function displayRadioValue() {
    var ele = document.getElementsByName('readStatus');
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        return readStatus = ele[i].value;
    }
}

//add new book
function addBookToLibrary(){
    event.preventDefault();
    const bookTitle = document.querySelector('#title');
    const bookAuthor = document.querySelector('#author');
    const bookPages = document.querySelector('#pages');
    displayRadioValue();

    newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readStatus);
    myLibrary.push(newBook);
    table.innerHTML = "";
    form.reset();
    generateTable(table, myLibrary);
}

//select table and content
let table = document.querySelector(".tableBody");
/* let data = Object.keys(myLibrary[0]); */

//populate table
function generateTable(table, myLibrary) {
    for (let element of myLibrary) {
        let x = myLibrary.indexOf(element);
        let row = table.insertRow();
            for (key in element) {
                let cell = row.insertCell();
                let text = document.createTextNode(element[key]);
                cell.appendChild(text);
                }

        //create read status toggle button
        let readCell = row.insertCell();
        let readBtn = document.createElement('button');
        readBtn.innerHTML = 'change status';
        readBtn.className = 'readStatusButton';
        readBtn.addEventListener('click', toggleReadStatus);
        readBtn.setAttribute('id', x);
        readCell.appendChild(readBtn);

        //create remove button
        let cell = row.insertCell();
        let btn = document.createElement('button');
        btn.innerHTML = 'Remove';
        btn.className = 'removeButton';
        btn.addEventListener('click', removeButtonFunction);
        btn.setAttribute('id', x);
        cell.appendChild(btn);
    }
};


//function of table buttons
let removeButtonFunction = () => {
    x = event.srcElement.id;
    myLibrary.splice(x, 1);
    table.innerHTML = "";
    generateTable(table, myLibrary);    
}

let toggleReadStatus = () => {
    x = event.srcElement.id;
    if (myLibrary[x].read == 'unread') {
        myLibrary[x].read = 'read';
    } else if(myLibrary[x].read == 'read') {
        myLibrary[x].read = 'unread';
    }
    table.innerHTML = "";
    generateTable(table, myLibrary);    
}



document.addEventListener('DOMContentLoaded', generateTable(table, myLibrary), false);