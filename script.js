let myLibrary = [];
let newBook;
let readStatus = '';
const form = document.getElementById('inputForm');
const errorElement = document.getElementById('error');
const bookTitle = document.querySelector('#title');
const bookAuthor = document.querySelector('#author');
const bookPages = document.querySelector('#pages');
 

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
function displayRadioValue() {
    var ele = document.getElementsByName('readStatus');
      
    for(i = 0; i < ele.length; i++) {
        if(ele[i].checked)
        return readStatus = ele[i].value;
    }
}

//create new book
function createNewBook () {
    newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, readStatus);
    myLibrary.push(newBook);            
}

//add new book
function addBookToLibrary(){
    event.preventDefault();
    displayRadioValue();

    let messages = [];
    if (bookTitle.value === '' || bookTitle.value == null) {
        messages.push('Title is required')}
    
    if (bookAuthor.value === '' || bookAuthor.value == null) {
        messages.push('Author is required')}

    if (bookPages.value === '' || bookTitle.value == null) {
        messages.push('Number of pages is required')}

    if (isNaN(bookPages.value)) {
        messages.push('Number of pages must be a number')}

    if (messages.length > 0) {
        /* preventDefault() */
        errorElement.innerText = messages.join(', ')}

    else {
        createNewBook();
        table.innerHTML = '';
        generateTable(table, myLibrary);
        form.reset();
        errorElement.innerText = '';
    }
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
        let removeCell = row.insertCell();
        let removeBtn = document.createElement('button');
        removeBtn.innerHTML = 'Remove';
        removeBtn.className = 'removeButton';
        removeBtn.addEventListener('click', removeButtonFunction);
        removeBtn.setAttribute('id', x);
        removeCell.appendChild(removeBtn);
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


//might need this once local storage is added
/* document.addEventListener('DOMContentLoaded', generateTable(table, myLibrary), false); */