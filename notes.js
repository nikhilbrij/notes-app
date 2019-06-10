const fs = require("fs");
const chalk = require("chalk");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => title === note.title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });

    saveNotes(notes);
    console.log(chalk.green.inverse("New note added!"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

//=========== 1st solution ===========
/*
const removeNote = function(title) {
  const notes = loadNotes();

  const duplicateNotes = notes.filter(function(note) {
    return note.title === title;
  });

  if (duplicateNotes.length === 1) {
    noteIndex = notes.findIndex(item => duplicateNotes[0].title === item.title);
    notes.splice(noteIndex, 1);

    saveNotes(notes);
    console.log("Note has been deleted");
  } else {
    console.log("Note does not exist");
  }
};
*/

//=========== 2nd solution ===========
const removeNote = title => {
  const notes = loadNotes();

  const notesToKeep = notes.filter(note => note.title !== title);

  if (notes.length > notesToKeep.length) {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse("note removed"));
  } else {
    console.log(chalk.red.inverse("note not found"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse("Your Notes!"));
  notes.forEach(note => {
    console.log(note.title);
  });
};

const readNote = title => {
  const notes = loadNotes();
  const duplicateNote = notes.find(note => title === note.title);
  if (duplicateNote) {
    console.log(
      chalk.green.inverse(duplicateNote.title) + " : " + duplicateNote.body
    );
  } else {
    console.log(chalk.red.inverse("Note not found! "));
  }
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
