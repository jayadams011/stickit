#STICKIT WEB APP REQUIREMENTS
---
1. On initial page load, the user should be presented with a nearly empty screen, which contains only:
- the name of the app (stickIt maybe, or whatever the final name ends up being)
- a button that says something like "+ Add Note"
2. When the button is clicked, a virtual sticky note should appear on screen. This action should repeat—creating a new note—every time the button is clicked.
3. Each sticky note should:
- Look like a sticky note
- Be able to be typed into. The text should wrap at or near the edge of the sticky note.
- Be able to be resized by grabbing and dragging its bottom-right corner. This capability should be indicated by turning the cursor into a resize icon when hovering over that part of the sticky note.
- Be able to be moved to a new location by grabbing and dragging it from the top. This capability should be indicated by turning the cursor into a move icon when hovering over that part of the sticky note.
4. The state of all sticky notes on screen, including their contents, size, and location, should be saved at least when the page is unloaded, reloaded, or the window is closed. It may be desirable to trigger a save as soon as a character is entered or deleted, or (if in the case of resize/move) whenever the user lets go of the mouse button.
