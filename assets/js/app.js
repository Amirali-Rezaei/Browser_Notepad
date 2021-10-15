// variables
const noteContainer = document.querySelector("#note-list");

// eventlisteners
// Calling the form submission function to work
eventListeners();

// form submission
function eventListeners() {
  document.querySelector("#form").addEventListener("submit", newNote);

  // Remove Note
  document.querySelector("#note-list").addEventListener("click", removeNote);

  // Get Data From Local storage
  document.addEventListener("DOMContentLoaded", getItemsFromLocalStorageOnLoad);
}

// functions

// Add a new note to the list
function newNote(e) {
  e.preventDefault();

  // getting access to the user input
  const note = document.querySelector("#note").value;
  if (note === '' || note === ' ') {
    location.reload();
  }

  // Create The remove button
  const removeNoteBtn = document.createElement("a");
  removeNoteBtn.textContent = "X";
  removeNoteBtn.classList.add("remove-note");

  // Create li tag
  const li = document.createElement("li");
  li.appendChild(document.createTextNode(note));

  // Adding remove button to li
  li.appendChild(removeNoteBtn);

  // Adding li to note list
  noteContainer.appendChild(li);

  // Reset The Text Area
  this.reset();

  // Calling the add to localStorage function
  addToLocalStorage(note);
}

// Removing a li (note from list)
function removeNote(e) {
  if (e.target.classList.contains("remove-note")) {
    e.target.parentElement.remove();
  }

  removeNoteFromLocalStorage(e.target.parentElement.textContent);
}

// Add note to local storage
function addToLocalStorage(note) {
  // Get Notes From Local Storage
  const notes = getNotesFromLocalStorage();

  // Add new note to the notes array
  notes.push(note);

  // Add New Note To Local Storage
  localStorage.setItem("notes", JSON.stringify(notes));
}

// Get Notes that are stored in the localStorage
function getNotesFromLocalStorage() {
  let notes;
  // Get Notes From Local Storage
  let getFromLocalStorage = localStorage.getItem("notes");

  if (getFromLocalStorage === null) {
    // if nothing is in local storage return an empty array
    notes = [];
  } else {
    // Converting string to Array
    notes = JSON.parse(getFromLocalStorage);
  }

  return notes;
}

// Getting Notes From Local Storage When Page Loads
function getItemsFromLocalStorageOnLoad() {
  const notes = getNotesFromLocalStorage();

  // Print Each Item From Notes
  notes.forEach(function (note) {
    // Create The remove button
    const removeNoteBtn = document.createElement("a");
    removeNoteBtn.textContent = "X";
    removeNoteBtn.classList.add("remove-note");

    // Create li tag
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(note));

    // Adding remove button to li
    li.appendChild(removeNoteBtn);

    // Adding li to note list
    noteContainer.appendChild(li);
  });
}

// Removing A Note From Local Storage
function removeNoteFromLocalStorage(noteIdentifier) {
  // Deleting 'X' From The Content
  const deletingNote = noteIdentifier.substring(0, noteIdentifier.length - 1);

  // Get Notes From LocalStorage
  const notes = getNotesFromLocalStorage();

  notes.forEach((note, index) => {
    switch (note) {
      case deletingNote:
        notes.splice(index, 1);
        break;
    }
  });

  // Set The New Array Of Notes To Local Storage
  localStorage.setItem("notes", JSON.stringify(notes));
}
