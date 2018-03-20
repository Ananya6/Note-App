const fs = require('fs');
//const os = require('os');
const _ =require('lodash');
const yargs = require('yargs');

const notes=require('./notes.js');


const yargv =yargs.argv;
  // .command('add','Add a new note')


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



// console.log(_.isString('true'));
// console.log(_.isString(true));
//
// var filteredArray=_.uniq([1,'Andrew',1,2,3,4]);
// console.log(filteredArray);
// var user=os.userInfo();
// //console.log(user);
// user.username='Ananya';
//
// var res=notes.addNote();
// console.log(res);
//
// var sum=notes.add(2,5);
// console.log(sum);
// // console.log("Hi");
// fs.appendFileSync('greetings.txt',`hello ${user.username} ! You are ${notes.age} years old. ` );
