# StickIt
StickIt is a sticky note emulator that places an emphasis on simplicity and ease of use. It allows users to create, move, resize and re-color virtual sticky notes. For users, interactivity is familiar and intutive.

For developers, creating and modifying new notes is a simple process:
```
var someNote = new Note();
someNote.setfColor('#fff');
someNote.sfx = someEffect;
```

## Features
- Practically unlimited sticky note creation
- Movement, resizing, and recoloring of sticky notes
- A title and content section per note
- Interaction-free persistence through local storage

## Installation
1. Download the source files from StickIt's repository: <https://www.github.com/dsnowb/stickit>
2. Open the index.html file in your browser of choice

## "API" Usage
Each note displayed on screen is a Note object. The Note() constructor function offers no parameters.

#### Note instance properties:
###### coords - *Array - Default: [500,200]*
Elements [x,y] where x and y represent the top-left corner's position relative to the viewport.
###### height - *Number - Default: 250*
The note's height in pixels.
###### width - *Number - Default: 250*
The note's width in pixels.
###### title - *String - Default: 'My Note'
The first of two content sections. Contains slightly enlarged "title" text. 12 character limit.
###### contents - *String - Default: empty string
The second content section. Contains the "body" of the note text.
###### id - *String - Default: 'note'+Note.notes.length*
A unique identifier given to the top level DOM node of the note as its id property. It is of the format 'note'+*num* where *num* is the instance's position in the array of all notes that currently exist (*Note.notes*).
###### filterColor - *String - Default: '#ff0'*
The color of the note, which is created by applying filterColor's value as a background color to a semi-opaque element that is absolutely positioned directly over the note's highest level container, but under the content containers. **Note:** This value is not an exact representation of the background color, as the highest level container contains grey gradient shading.
###### maxTilt - *Number - Default: 5*
Sets the lowest and highest possible values generated for *tilt* on instantiation.
###### tilt - *Number - Default: random float between -maxTilt and maxTilt*
The amount of rotate (in degrees), performed using CSS's transform property, placed on the note's highest level container.
###### trashed - *Boolean - Default: false*
Determines whether a note will be rendered on page load. If trashed is true, the item will simply not be rendered to the screen. All other attributes remain unchanged.
###### sfx - *String - Default: 'newnote'*
Will be placed as a class in the class attribute of the highest level container of the object. This in turn correlates to CSS animations attached to that class name in style.css. 'newnote' makes the note waggle when rendered. 'loadednote' makes the note pop out of the screen. sfx is assigned to an empty string at the end of render(). 
###### curl - *String - Default: randomly selected element in Note.arrCurlNames*
Like sfx, will be a class on the highest level container. This correlates to CSS classes that define the type of 'curl' effect that note corners exhibit. This value is randomly assigned on instantiation from the array of possible curls.

#### Note instance function properties and prototype functions

## Contribute
Issue tracker: <https://www.github.com/dsnowb/stickit/issues>
Source: <https://www.github.com/dsnowb/stickit>

## Support
Unsupported

## License
Stickit is licensed under the MIT license
