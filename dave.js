'use strict';

//global variables to hold current cursor location
var mouseX = 0;
var mouseY = 0;
document.onmousemove = function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
};

//var to hold note curl effect array
Note.arrCurlNames = ['curl1','curl2','curl3'];

//holder array and file system functions
Note.notes = [];
Note.saveNotes = function() { localStorage.notes = JSON.stringify(Note.notes);};
Note.loadNotes = function() {
  var objArr = JSON.parse(localStorage.notes);
  for (var i = 0; i < objArr.length; i++) {
    Note.notes[i] = Object.assign(new Note(), objArr[i]);
    if (!Note.notes[i].trashed) Note.notes[i].render();
  }
};

//actions performed on unload
Note.onExit = function() {
  for (var i = 0; i < Note.notes.length; i++) Note.notes[i].sfx = 'loadnote';
  Note.saveNotes();
};

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

  //Number of degrees rotated (from -maxTilt to +maxTilt)
  var maxTilt = 5;
  this.tilt = (Math.random() - .5) * 2 * maxTilt;

  //indicates whether the note is invisible
  this.trashed = false;

  //if age is 'newnote', an animation will occur on render - then age will be set to an empty string.
  this.sfx = 'newnote';

  //note shadow curl randonizer
  this.curl = Note.arrCurlNames[Math.round(Math.random()) * Note.arrCurlNames.length];

  Note.notes.push(this);

  this.unrender = function() {
    var noteEl = document.getElementById(this.id);
    noteEl.parentNode.removeChild(noteEl);
  };

  this.render = function() {
    //unrender if already on screen
    if (document.getElementById(this.id)) this.unrender();

    //create Elements
    var bodyEl = document.querySelector('body');
    var noteEl = document.createElement('div');
    var noteFilterEl = document.createElement('div');
    var noteTitleEl = document.createElement('input');
    var noteTrashEl = document.createElement('div');
    var noteInputEl = document.createElement('textarea');
    var noteMarginTop = document.createElement('div');
    var noteMarginRight = document.createElement('div');
    var noteMarginBottom = document.createElement('div');
    var noteMarginLeft = document.createElement('div');
    var noteResizeEl = document.createElement('div');
    //color picker
    var noteSetFColorEl = document.createElement('div');
    var noteSFCYellowEl = document.createElement('div');
    var noteSFCOrangeEl = document.createElement('div');
    var noteSFCRedEl = document.createElement('div');
    var noteSFCPurpleEl = document.createElement('div');
    var noteSFCBlueEl = document.createElement('div');
    var noteSFCGreenEl = document.createElement('div');

    //set position and size for note
    noteEl.style.top = this.coords[1] + 'px';
    noteEl.style.left = this.coords[0] + 'px';
    noteEl.style.height = this.height + 'px';
    noteEl.style.width = this.width + 'px';

    //add content to note
    noteTitleEl.value = this.title;
    noteInputEl.textContent = this.contents;

    //set attributes, esp. classes to be used by styles and scripts
    noteEl.setAttribute('class', 'note ' + this.sfx + ' ' + this.curl);
    noteEl.setAttribute('id', this.id);
    noteEl.style.transform = 'rotate(' + this.tilt + 'deg)';
    noteEl.style.visibility = 'visible';
    noteFilterEl.setAttribute('class', 'noteFilter');
    noteFilterEl.style.background = this.filterColor;
    noteTitleEl.setAttribute('class', 'noteTitle');
    noteTitleEl.setAttribute('type', 'text');
    noteTitleEl.setAttribute('maxlength', '12');
    noteTrashEl.setAttribute('class', 'noteTrash');
    noteTrashEl.textContent = 'x';
    noteInputEl.setAttribute('class' ,'noteInput');
    noteMarginTop.setAttribute('class', 'noteMarginTop');
    noteMarginRight.setAttribute('class', 'noteMarginRight');
    noteMarginBottom.setAttribute('class', 'noteMarginBottom');
    noteMarginLeft.setAttribute('class', 'noteMarginLeft');
    noteResizeEl.setAttribute('class', 'noteResize');
    noteSetFColorEl.setAttribute('class', 'noteSetFColor');
    noteSFCYellowEl.style.background = 'yellow';
    noteSFCOrangeEl.style.background = 'orange';
    noteSFCRedEl.style.background = 'red';
    noteSFCPurpleEl.style.background = 'purple';
    noteSFCBlueEl.style.background = 'blue';
    noteSFCGreenEl.style.background = 'green';

    //event listeners
    noteFilterEl.addEventListener('mousedown', this.startMove.bind(this));
    noteTitleEl.addEventListener('change', this.save.bind(this));
    noteTitleEl.addEventListener('keyup', this.save.bind(this));
    noteTrashEl.addEventListener('click', this.trash.bind(this));
    noteInputEl.addEventListener('change', this.save.bind(this));
    noteInputEl.addEventListener('keyup', this.save.bind(this));
    noteMarginTop.addEventListener('mousedown', this.startMove.bind(this));
    noteMarginRight.addEventListener('mousedown', this.startREWResize.bind(this));
    noteMarginBottom.addEventListener('mousedown', this.startNSResize.bind(this));
    noteMarginLeft.addEventListener('mousedown', this.startLEWResize.bind(this));
    noteResizeEl.addEventListener('mousedown', this.startNWSEResize.bind(this));
    noteSFCYellowEl.addEventListener('click', this.setfColor.bind(this,'yellow'));
    noteSFCOrangeEl.addEventListener('click', this.setfColor.bind(this,'orange'));
    noteSFCRedEl.addEventListener('click', this.setfColor.bind(this,'red'));
    noteSFCPurpleEl.addEventListener('click', this.setfColor.bind(this,'purple'));
    noteSFCBlueEl.addEventListener('click', this.setfColor.bind(this,'blue'));
    noteSFCGreenEl.addEventListener('click', this.setfColor.bind(this,'green'));
    window.addEventListener('mouseup', this.stopInterval.bind(this));
    window.addEventListener('unload', Note.onExit);

    //build note element and attach to DOM
    bodyEl.appendChild(noteEl);
    noteEl.appendChild(noteFilterEl);
    noteEl.appendChild(noteTitleEl);
    noteEl.appendChild(noteTrashEl);
    noteEl.appendChild(noteInputEl);
    noteEl.appendChild(noteMarginTop);
    noteEl.appendChild(noteMarginRight);
    noteEl.appendChild(noteMarginBottom);
    noteEl.appendChild(noteMarginLeft);
    noteEl.appendChild(noteResizeEl);
    noteEl.appendChild(noteSetFColorEl);
    noteSetFColorEl.appendChild(noteSFCYellowEl);
    noteSetFColorEl.appendChild(noteSFCOrangeEl);
    noteSetFColorEl.appendChild(noteSFCRedEl);
    noteSetFColorEl.appendChild(noteSFCPurpleEl);
    noteSetFColorEl.appendChild(noteSFCBlueEl);
    noteSetFColorEl.appendChild(noteSFCGreenEl);

    if (this.sfx) this.sfx = '';
  };

  //handles moving the note, initiated with startMove
  this.move = function(offsetX, offsetY) {
    this.coords = [mouseX - offsetX, mouseY - offsetY];
    this.render();
  };

  //handle resizing the note
  var minWidth = 150;
  var minHeight = 150;
  this.nwseResize = function() {
    this.width = mouseX - this.coords[0];
    this.height = mouseY - this.coords[1];
    if (this.width < minWidth) this.width = minWidth;
    if (this.height < minHeight) this.height = minHeight;
    this.render();
  };
  this.nsResize = function() {
    this.height = mouseY - this.coords[1];
    if (this.height < minHeight) this.height = minHeight;
    this.render();
  };
  this.rewResize = function() {
    this.width = mouseX - this.coords[0];
    if (this.width < minWidth) this.width = minWidth;
    this.render();
  };
  this.lewResize = function() {
    var oldX = this.coords[0];
    var maxX = this.coords[0] + this.width - minWidth;
    this.coords[0] = mouseX;
    if (this.coords[0] > maxX) this.coords[0] = maxX;
    this.width -= this.coords[0] - oldX;
    this.render();
  };

  //intervals for move and resize functions
  var interval = 0;
  this.startMove = function(e) {
    e.preventDefault();
    var offsetX = mouseX - this.coords[0];
    var offsetY = mouseY - this.coords[1];
    interval = setInterval(this.move.bind(this, offsetX, offsetY), 10);
  };
  this.startNWSEResize = function(e) { e.preventDefault(); interval = setInterval(this.nwseResize.bind(this), 10); };
  this.startNSResize = function(e) { e.preventDefault(); interval = setInterval(this.nsResize.bind(this), 10); };
  this.startLEWResize = function(e) { e.preventDefault(); interval = setInterval(this.lewResize.bind(this), 10); };
  this.startREWResize = function(e) { e.preventDefault(); interval = setInterval(this.rewResize.bind(this), 10); };
  this.stopInterval = function(e) {
    e.preventDefault();
    Note.saveNotes();
    clearInterval(interval);
  };

  //save contents of note before unrendering... and check for konami
  this.save = function() {
    this.title = document.getElementById(this.id).childNodes[1].value;
    this.contents = document.getElementById(this.id).childNodes[3].value;
    Note.saveNotes();
    if (this.contents === 'upupdowndownleftrightleftrightba') konami();
  };

  //set color of note
  this.setfColor = function(color) {
    this.filterColor = color;
    this.render();
  };

  this.trash = function() {
    this.trashed = true;
    this.unrender();
    this.age = 'newnote';
    Note.saveNotes();
  };
}

//Displays note as a grid of divs ("clips"), where clipCount is the number of rows and columns of clips
Note.prototype.clipify = function(clipCount) {
  //Remove any leftover sfx classes and get note element
  this.unrender();
  this.render();
  var noteEl = document.getElementById(this.id);

  //each clip's width and height as a percentage of the whole note 
  var percentHW = 100 / clipCount;
  
  //make a copy of noteEl that has no clips in it
  var starterEl = noteEl.cloneNode(true);

  //hide noteEl - only clips will be visible
  noteEl.style.visibility = 'hidden';

  //build each clip by row and column
  for (var i = 0; i < clipCount; i++) {
    for (var j = 0; j < clipCount; j++) {
      var clip = starterEl.cloneNode(true);
      clip.classList.add('clip');
      clip.style.top = '0';
      clip.style.left = '0';
      clip.style.transform = 'rotate(0)';
      clip.style.clipPath = 'inset(' + percentHW*i + '% ' + (100-percentHW*(j+1)) + '% ' + (100-percentHW*(i+1)) + '% ' + percentHW*j + '%)';
      noteEl.appendChild(clip);
    }
  }
}

//runs clipify on note, then throws each clip in a random direction. Higher clipCount will create more individual particles, higher
//strength will create a larger explosion effect.
//Recommended clipCount values: 3-5.
//Recommended strength values: 50 seems pretty explodey.
Note.prototype.explode = function(clipCount, strength) {
  this.clipify(clipCount);

  var noteEl = document.getElementById(this.id);
  requestAnimationFrame(function() {
    for (var i = 0; i < noteEl.childNodes.length; i++) {
      noteEl.childNodes[i].style.top = (Math.random()-.5)*100*strength + 'px';
      noteEl.childNodes[i].style.left = (Math.random()-.5)*100*strength + 'px';
    }
  });
}

//when it presses the code, precious...
function konami() {
  for (var i = 0; i < Note.notes.length; i++)
    Note.notes[i].explode(5,50); 
}

function init() {
  if (localStorage.notes) Note.loadNotes();
}

init();
