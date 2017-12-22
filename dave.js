'use strict';

var Note.notes = [];
function Note() {

  //the top-left corner's xy-coordinates of the format [x,y]
  this.coords = [400,400];

  //dimensions of the note in pixels
  this.height = 400;
  this.width = 400;
 
  //the text contents of the note:
  this.contents = '';

  //For use with note color stretch goal
  //this.filter = false;
  //this.filterColor = #fff;

  Note.notes.push(this);
}
