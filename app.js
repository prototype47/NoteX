console.log("welcome to NoteX");
showNotes();  // reads all the notes from local storage and displays in the div where id="notes"
// if user adds a note,  add it to the local storage
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function(e)
{
    let addtxt = document.getElementById("addtxt");
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = [];  // yeh ek array hai
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addtxt.value);  // if some one clicks add btn then we also update the notes
    localStorage.setItem("notes", JSON.stringify(notesObj));  // string meh convert isliye kiya kyuki local stroage meh string meh hi set karna part hai
    addtxt.value = "";  // taaki text area meh likha hua gayab ho jaye ekbaar add note pr koi click kare toh
    // console.log(notesObj);
    showNotes();
});

// function to show elements from local storage
function showNotes() 
{
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = [];  // yeh ek array hai
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index)
    {
        html += `<div class="noteCard card my-2 mx-2" style="width: 18rem">
        <div class="card-body">
        <h5 class="card-title">Note ${index + 1}</h5>
          <p class="card-text">${element}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete from NoteX</button>  
          </div>
          </div> `; // id=${index} karne se deleteNote function ko wo uss note ki index mil jayegi jisko delete karna hai, onclick meh this.id likhne se uss element ki id chali jaati jis pr click kara hai mtlab issi element ki id chali jayegi deleteNote function meh 
    }); 
    let notesElm = document.getElementById("notes"); 
    if(notesObj.length != 0)
    {
        notesElm.innerHTML = html;
    }
    else
    {
        notesElm.innerHTML = `Nothing to Show !!`;
    }
}

// function to delete a note
function deleteNote(index)
{
    // console.log("I am Deleting...", index);
    let notes = localStorage.getItem("notes");
    if(notes == null)
    {
        notesObj = [];  // yeh ek array hai
    }
    else
    {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);      // splice(start index, no of elements to be removed) - used to remove elements from start index 
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

// for search 
let search = document.getElementById("searchtxt");
search.addEventListener("input", function()
{
    let inputval = search.value.toLowerCase();  // converting input value to lowercase
    // console.log('Input Event Fired', inputval);
    let noteCards = document.getElementsByClassName("noteCard"); // this will give us all note cards whose class is noteCard
    Array.from(noteCards).forEach(function(element)     // then we loop over these cards to match its content with the input in search box
    {
        let cardtxt = element.getElementsByTagName("p")[0].innerText;  // this will give us the content in the note cards since content is written in p tag and innerText will give the content inside that tag
        if(cardtxt.includes(inputval))
        {
            element.style.display = "block";    // agar search box ka input (inputval) match kar gaya hmare cardtxt ke input se toh note ko dikhao aur agar nahi match kara toh note ko hide kar do
        }
        else
        {
            element.style.display = "none";
        }
    });
});

/* Features that can be added : - 
1. Add title of Note
2. mark a note as important
*/