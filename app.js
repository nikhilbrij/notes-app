const chalk = require("chalk");
const yargs = require("yargs");
const fs = require("fs");
const notes = require("./notes");

//custimized yargs version
yargs.version("1.1.0");

//Create a ADD Command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    },

    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

//Create a REMOVE Command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

//Create a READ Command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title);
  }
});

//Create a LIST Command
yargs.command({
  command: "list",
  describe: "List your notes",
  handler() {
    notes.listNotes();
  }
});

// console.log(yargs.argv);
yargs.parse();
