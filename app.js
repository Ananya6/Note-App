const fs = require('fs');
const _ =require('lodash');
const yargs = require('yargs');

const notes=require('./notes.js');

var titleOptions={
  describe:'Title of note',
  demand: true,
  alias: 't'
};
var bodyOptions={
  describe:'Body of note',
  demand: true,
  alias:'b'
};

const yargv =yargs
  .command('add','Add a new note',{
    title:titleOptions,
    body:bodyOptions
  })
  .command('list','Listing all notes')
  .command('read','Read a note',{
    title:titleOptions,
  })
  .command('remove','Remove a note',{
    title:titleOptions,
  })
  .help()
  .argv;

//var command=process.argv[2];
var command=yargv._[0];
console.log('Command: ',command);

if(command==='add'){
  var note =notes.addNote(yargv.title,yargv.body);
  if (!note) {
    console.log("Sorry! Note with same title already exists");
  }else{
    console.log(`New note created`);
    console.log(` ${note.title} \n ${note.body}`);
    notes.logNote(note);
  }
}
else if(command==='list'){
  var allNotes= notes.getAll();
  console.log(`Displaying all ${allNotes.length} notes\n`);
  allNotes.forEach( (note) =>notes.logNote(note));
}
else if(command==='read'){
  var note =notes.readNote(yargv.title);
  if(note)
  notes.logNote(note);
  var message = note ? `Reading note :${note.title} \n ${note.body}`:`Note ${yargv.title} doesn't exist`;
  console.log(message);
}
else if(command==='remove'){
  var noteRemoved=notes.removeNote(yargv.title);
  var message= noteRemoved ? `Note ${yargv.title} has been removed` : `Note ${yargv.title} doesnt exist`;
  console.log(message);
}
else
console.log('Command not recognised');
