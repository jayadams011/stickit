'use strict';

Note.notes = [];
function Note() {

  //the top-left corner's xy-coordinates of the format [x,y]
  this.coords = [400,400];

  //dimensions of the note in pixels
  this.height = 400;
  this.width = 400;
 
  //the text contents of the note
  this.contents = '';
  this.title = '';

  //For use with note color stretch goal
  //this.filter = false;
  //this.filterColor = #fff;

  Note.notes.push(this);

  this.render = function() {
    //get elements
    var bodyEl = document.querySelector('body');
    var noteEl = document.createElement('div');
    var noteHeaderEl = document.createElement('div');
    var noteInputEl = document.createElement('textarea');
    var noteResizeEl = document.createElement('div');

    //set position and size for note
    noteEl.style.top = this.coords[1] + 'px';
    noteEl.style.left = this.coords[0] + 'px';
    noteEl.style.height = this.height + 'px';
    noteEl.style.width = this.width + 'px';

    //add content to note
    noteInputEl.textContent = this.contents;
    noteHeaderEl.textContent = this.title;

    //set classes to be used by css styles
    noteEl.setAttribute('class','note');
    noteHeaderEl.setAttribute('class','noteHeader');
    noteInputEl.setAttribute('class','noteInput');
    noteResizeEl.setAttribute('class','noteResize');

    //build note element and attach to DOM
    noteEl.appendChild(noteHeaderEl);
    noteEl.appendChild(noteInputEl);
    noteEl.appendChild(noteResizeEl);
    bodyEl.appendChild(noteEl);
  }
}

var note = new Note();
note.render();
