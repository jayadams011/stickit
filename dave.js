'use strict';

//global variables to hold current cursor location
var mouseX = 0;
var mouseY = 0;
document.onmousemove = function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

Note.notes = [];
Note.saveNotes = function() { localStorage.notes = JSON.stringify(Note.notes); }
Note.loadNotes = function() {
  var objArr = JSON.parse(localStorage.notes);
  for (var i = 0; i < objArr.length; i++) {
    Note.notes[i] = Object.assign(new Note(), objArr[i]);
    Note.notes[i].render();
  }
}

function Note() {

  //the top-left corner's xy-coordinates of the format [x,y]
  this.coords = [500,200];

  //dimensions of the note in pixels
  this.height = 250;
  this.width = 250;
 
  //the text contents of the note
  this.title = 'My Note';
  this.contents = '';

  //object id for use with unrender function
  this.id = 'note' + Note.notes.length;

  //For use with note color stretch goal
  this.filterColor = '#ff0';

  Note.notes.push(this);
  
  this.unrender = function() {
    var noteEl = document.getElementById(this.id);
    noteEl.parentNode.removeChild(noteEl);
  }
  
  this.render = function() {
    //unrender if already on screen
    if (document.getElementById(this.id)) this.unrender();

    //create Elements
    var bodyEl = document.querySelector('body');
    var noteEl = document.createElement('div');
    var noteFilterEl = document.createElement('div');
    var noteTitleEl = document.createElement('input');
    var noteInputEl = document.createElement('textarea');
    var noteMarginTop = document.createElement('div');
    var noteMarginRight = document.createElement('div');
    var noteMarginBottom = document.createElement('div');
    var noteMarginLeft = document.createElement('div');
    var noteResizeEl = document.createElement('div');

    //set position and size for note
    noteEl.style.top = this.coords[1] + 'px';
    noteEl.style.left = this.coords[0] + 'px';
    noteEl.style.height = this.height + 'px';
    noteEl.style.width = this.width + 'px';

    //add content to note
    noteTitleEl.value = this.title;
    noteInputEl.textContent = this.contents;

    //set attributes, esp. classes to be used by styles and scripts
    noteEl.setAttribute('class', 'note');
    noteEl.setAttribute('id', this.id);
    noteFilterEl.setAttribute('class', 'noteFilter');
    noteFilterEl.style.background = this.filterColor;
    noteTitleEl.setAttribute('class', 'noteTitle');
    noteTitleEl.setAttribute('type', 'text');
    noteInputEl.setAttribute('class' ,'noteInput');
    noteMarginTop.setAttribute('class', 'noteMarginTop');
    noteMarginRight.setAttribute('class', 'noteMarginRight');
    noteMarginBottom.setAttribute('class', 'noteMarginBottom');
    noteMarginLeft.setAttribute('class', 'noteMarginLeft');
    noteResizeEl.setAttribute('class', 'noteResize');

    //event listeners
    noteFilterEl.addEventListener('mousedown', this.startMove.bind(this));
    noteTitleEl.addEventListener('change', this.save.bind(this));
    noteInputEl.addEventListener('change', this.save.bind(this));
    noteMarginTop.addEventListener('mousedown', this.startMove.bind(this));
    noteMarginRight.addEventListener('mousedown', this.startREWResize.bind(this));
    noteMarginBottom.addEventListener('mousedown', this.startNSResize.bind(this));
    noteMarginLeft.addEventListener('mousedown', this.startLEWResize.bind(this));
    noteResizeEl.addEventListener('mousedown', this.startNWSEResize.bind(this));
    window.addEventListener('mouseup', this.stopInterval.bind(this));

    //build note element and attach to DOM
    bodyEl.appendChild(noteEl);
    noteEl.appendChild(noteFilterEl);
    noteEl.appendChild(noteTitleEl);
    noteEl.appendChild(noteInputEl);
    noteEl.appendChild(noteMarginTop);
    noteEl.appendChild(noteMarginRight);
    noteEl.appendChild(noteMarginBottom);
    noteEl.appendChild(noteMarginLeft);
    noteEl.appendChild(noteResizeEl);
  }
  
  //handles moving the note, initiated with startMove
  this.move = function(offsetX, offsetY) {
    this.coords = [mouseX - offsetX, mouseY - offsetY];
    this.render();
  }
  
  //handle resizing the note
  var minWidth = 150;
  var minHeight = 150;
  this.nwseResize = function() {
    this.width = mouseX - this.coords[0];
    this.height = mouseY - this.coords[1];
    if (this.width < minWidth) this.width = minWidth;
    if (this.height < minHeight) this.height = minHeight;
    this.render();
  }
  this.nsResize = function() {
    this.height = mouseY - this.coords[1];
    if (this.height < minHeight) this.height = minHeight;
    this.render();
  }
  this.rewResize = function() {
    this.width = mouseX - this.coords[0];
    if (this.width < minWidth) this.width = minWidth;
    this.render();
  }
  this.lewResize = function() {
    var oldX = this.coords[0];
    this.coords[0] = mouseX;
    this.width -= this.coords[0] - oldX;
    if (this.width < minWidth) {
      this.width = minWidth;
      this.coords[0] = oldX;
    }
    this.render();
  }

  //intervals for move and resize functions
  var interval = 0;
  this.startMove = function(e) { 
    e.preventDefault();
    var offsetX = mouseX - this.coords[0];
    var offsetY = mouseY - this.coords[1];
    interval = setInterval(this.move.bind(this, offsetX, offsetY), 10);
  }
  this.startNWSEResize = function(e) { e.preventDefault(); interval = setInterval(this.nwseResize.bind(this), 10); }
  this.startNSResize = function(e) { e.preventDefault(); interval = setInterval(this.nsResize.bind(this), 10); }
  this.startLEWResize = function(e) { e.preventDefault(); interval = setInterval(this.lewResize.bind(this), 10); }
  this.startREWResize = function(e) { e.preventDefault(); interval = setInterval(this.rewResize.bind(this), 10); }
  this.stopInterval = function() {
    Note.saveNotes();
    clearInterval(interval);
  }

  //save contents of note before unrendering
  this.save = function() {
    this.title = document.getElementById(this.id).childNodes[1].value;
    this.contents = document.getElementById(this.id).childNodes[2].value;
    Note.saveNotes();
  }

  //set color of note
  this.setfColor = function(color) {
    this.filterColor = color;
    this.render();
  }
}

function init() {
  if (localStorage.notes) Note.loadNotes();
}

init();
