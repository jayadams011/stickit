# StickIt
StickIt is a sticky note emulator that places an emphasis on simplicity and ease of use. It allows users to create, move, resize and re-color virtual sticky notes. For users, interactivity is familiar and intutive.

For developers, creating and modifying new notes is a simple process:
```
var someNote = new Note();
someNote.setfColor('#fff');
someNote.sfx = someEffect;
```

## Features
-Practically unlimited sticky note creation

-Movement, resizing, and recoloring of sticky notes

-A title and content section per note

-Interaction-free persistence through local storage

## Installation
1. Download the source files from StickIt's repository: <https://www.github.com/dsnowb/stickit>
2. Open the index.html file in your browser of choice

## "API" Usage

Each note displayed on screen is a Note object. The Note() constructor function offers no parameters.

####Note instance properties:
###### coords
An array with elements [x,y] where x and y represent the top-left corner's position relative to the viewport. *Default: [500,200]*
###### height
The note's height in pixels *Default: 250*
###### width
The note's width in pixelsi *Default: 250*
###### title
The first of two content sections. Contains slightly enlarged "title" text. 12 character limit. *Default: 'My Note'*
###### contents
The second content section. Contains the "body" of the note text. *Default: empty string*
###### id
A unique identifier given to the top level DOM node of the note as its id property. It is of the format 'note'+*num* where *num* is the instance's position in the array of all notes that currently exist (*Note.notes*).
###### filterColor
The color of the note, which is created by applying filterColor's value as a background color to a semi-opaque element that is absolutely positioned directly over the note's highest level container, but under the content containers. **Note:** This value is not an exact representation of the background color, as the highest level container contains grey gradient shading. *Default: '#ff0'*
###### tilt & maxTilt
tilt is the amount of rotate (in degrees) that is performed using CSS's transform property, and is a randomly generated value between -maxTilt and +maxTilt (also degrees). *Default maxTilt: 5*


## Contribute
Issue tracker: <https://www.github.com/dsnowb/stickit/issues>
Source: <https://www.github.com/dsnowb/stickit>

## Support
Unsupported

## License
Stickit is licensed under the MIT license
