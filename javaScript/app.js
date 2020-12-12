console.log("THis is javascript project 1");
showNotes(); // when page reloads all the added notes will disappear so to avoid that call showNotes() function at the begining
//if user adds a note , add it to the localstorage

let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function(e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("title");
    let today = new Date();
    let day = today.toString();
    let currDate = day.substring(0, 25);
    let notes = localStorage.getItem("notes"); // during 1st ieration it will be null as it is defined for the first time here notes is an empty key .
    if (notes == null) {
        // alert('please enter a input data');
        notesObj = []; // so therefore an noteObj is created compulsaryly.
    } else {

        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: addTitle.value,
        text: addTxt.value,
        date: currDate
    }

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj)); //here during 1st iteration notes key will be set by notesObj which has user inputted text
    addTxt.value = "";
    addTitle.value = "";
    currDate = "";
    // console.log(notesObj);
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    let html = "";


    notesObj.forEach(function(element, index) { //here element,index denotes element value and its index position in array notesObj.


        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text"> ${element.text} </p>
            <hr />
            <p class="card-text"> ${element.date} </p>
            <hr />
            <button id = "${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`

    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a note" section to add notes`
    }
}

//function to delete a note

function deleteNote(index) {
    // console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);

    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}


//search function

let search = document.getElementById('searchTxt');
search.addEventListener('input', function() {

    let inputval = search.value.toLowerCase();

    // console.log('input event fired : ', inputval);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTitle = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        if (cardTxt.includes(inputval) || cardTitle.includes(inputval)) {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    })

})