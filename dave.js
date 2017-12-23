'use strict';

//global variables to hold current cursor location
var mouseX = 0;
var mouseY = 0;
document.onmousemove = function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

Note.notes = [];
function Note() {

  //the top-left corner's xy-coordinates of the format [x,y]
  this.coords = [500,200];

  //dimensions of the note in pixels
  this.height = 400;
  this.width = 400;
 
  //the text contents of the note
  this.contents = '';

  //object id for use with unrender function
  this.id = 'note' + Note.notes.length;

  //For use with note color stretch goal
  //this.filter = false;
  //this.filterColor = #fff;

  Note.notes.push(this);
  
  this.unrender = function() {
    var noteEl = document.getElementById(this.id);
    noteEl.parentNode.removeChild(noteEl);
  }
  
  this.render = function() {
    //get elements
    var bodyEl = document.querySelector('body');
    var noteEl = document.createElement('div');
    var noteFilterEl = document.createElement('div');
    var noteTitleEl = document.createElement('textarea');
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
    noteInputEl.textContent = this.contents;

    //set classes and ids to be used by styles and scripts
    noteEl.setAttribute('class', 'note');
    noteEl.setAttribute('id', this.id);
    noteFilterEl.setAttribute('class', 'noteFilter');
    noteTitleEl.setAttribute('class', 'noteTitle');
    noteInputEl.setAttribute('class' ,'noteInput');
    noteMarginTop.setAttribute('class', 'noteMarginTop');
    noteMarginRight.setAttribute('class', 'noteMarginRight');
    noteMarginBottom.setAttribute('class', 'noteMarginBottom');
    noteMarginLeft.setAttribute('class', 'noteMarginLeft');
    noteResizeEl.setAttribute('class', 'noteResize');

    //event listeners
    noteMarginTop.addEventListener('mousedown', this.startMove.bind(this));
    noteMarginRight.addEventListener('mousedown', this.startEWResize.bind(this));
    noteMarginBottom.addEventListener('mousedown', this.startNSResize.bind(this));
    noteMarginLeft.addEventListener('mousedown', this.startEWResize.bind(this));
    noteResizeEl.addEventListener('mousedown', this.startNWSEResize.bind(this));
    noteInputEl.addEventListener('change', this.save.bind(this));
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
    this.unrender();
    this.render();
  }
  
  //handle resizing the note
  var minWidth = 40;
  var minHeight = 40;
  this.nwseResize = function() {
    this.width = mouseX - this.coords[0];
    this.height = mouseY - this.coords[1];
    if (this.width < minWidth) this.width = minWidth;
    if (this.height < minHeight) this.height = minHeight;
    this.unrender();
    this.render();
  }
  this.nsResize = function() {
    this.height = mouseY - this.coords[1];
    if (this.height < minHeight) this.height = minHeight;
    this.unrender();
    this.render();
  }
  this.ewResize = function(side) {
    if (side === 'l') {
      var oldX = this.coords[0];
      this.coords[0] = mouseX;
      this.width -= this.coords[0] - oldX;
    }
    else this.width = mouseX - this.coords[0];
    if (this.width < minWidth) this.width = minWidth;
    this.unrender();
    this.render();
  }

  //intervals for move and resize functions
  var interval = 0;
  this.startMove = function() { 
    var offsetX = mouseX - this.coords[0];
    var offsetY = mouseY - this.coords[1];
    interval = setInterval(this.move.bind(this, offsetX, offsetY), 10);
  }
  this.startNWSEResize = function() { interval = setInterval(this.nwseResize.bind(this), 10); }
  this.startNSResize = function() { interval = setInterval(this.nsResize.bind(this), 10); }
  this.startEWResize = function() { interval = setInterval(this.ewResize.bind(this), 10); }
  this.stopInterval = function() { clearInterval(interval); }

  this.save = function() { this.contents = document.getElementById(this.id).childNodes[2].value; }
}

var note = new Note();
note.render();
