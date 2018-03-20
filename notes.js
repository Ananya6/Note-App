const fs = require('fs');

//var notes = [];
var fetchNotes = () => {
  try{
    var noteString = fs.readFileSync('notes-data.json');
    return JSON.parse(noteString);
  }catch(e){
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNote=(title,body)=>{
  var notes =fetchNotes();
  var note = {
    title:title,
    body
  };

  var duplicateNotes =notes.filter((note) => note.title === title);
  if(duplicateNotes.length ==0){
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll= () =>{
  var notes= fetchNotes();
  return notes;
};

var readNote =(title) =>{
  var notes=fetchNotes();
  var reqReadNote =notes.filter((note) => note.title === title);
  if(reqReadNote.length == 0)
  return null;
  else
  return reqReadNote[0];

};

var removeNote =(title) =>{
  var notes=fetchNotes();
  var remainingNotes=notes.filter((x) => x.title !== title);
  saveNotes(remainingNotes);
  if(notes.length-remainingNotes.length==1){
   return true;
  }
  return false;
};

var logNote = (note) =>{
  //debugger;
  console.log("-----");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}
module.exports = {
 addNote,
 getAll,
 readNote,
 removeNote,
 logNote
};
//:addNote not written since property name=value name hence we dont need to write value


// module.exports.age =25;
//
// module.exports.addNote=()=>{
//   console.log('addNote');
//   return 'New note';
// }
//
// module.exports.add=(num1,num2)=>{
//   return (num1+num2);
// };
//console.log(module);
