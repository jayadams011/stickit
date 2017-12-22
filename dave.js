'use strict';

var Note.notes = [];
function Note() {

  //the top-left and bottom-right corners' xy-coordinates of the format [x1,y1,x2,y2]
  this.coords = [400,400,800,800];
 
  //the text contents of the note:
  this.contents = '';

  //For use with note color stretch goal
  //this.filter = false;
  //this.filterColor = #fff;

  Note.notes.push(this);
}
