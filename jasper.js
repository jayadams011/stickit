'use strict';

//create a variable for button element
var newNoteButton = document.getElementById('newNoteButton');

//create an event listener that listens for click-event on newNoteButton to render a new-note to page.
//listen for click --> addNote
newNoteButton.addEventListener('click', addNote);


//create function to render newNote to page
function addNote(){
  //create a new instance of "Note"...
  var note = new Note(); //
  //render 'note' to screen.
  note.render(); //i.e - render the actual 'note' to the sceen on the idea 'Note'..
};
