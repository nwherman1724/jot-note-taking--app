const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');

// setting port
const PORT = process.env.PORT || 3001;

// 
const app = express();

const testMiddle = 

app.use(express.json());
app.use(express.static('public'));

// get request to return indes.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// get request that return notes.html at the /notes path
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// get request that return notes from db
app.get('/api/notes', (req,res) => {
    fs.readFile('./db/db.json', 'utf8', (err,data) => {
      if(err){
        console.error(err)
      } else  
    
    res.json(JSON.parse(data));
  })
})


app.post('/api/notes', (req, res) => {
  // Log that a POST request was received
  console.info(`${req.method} request received to add a review`);

  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      title,
      text,
      id: uuid(),
    };

    fs.readFile('./db/db.json', 'utf8', (err,data) => {
      if(err){
        console.error(err)
      } else {
        const parsedNotes = JSON.parse(data)
        parsedNotes.push(newNote)

        const noteStr = JSON.stringify(parsedNotes, null, 2);

        fs.writeFile('./db/db.json', noteStr, (err) => {
        if(err){
          console.log(err)
        }else {
          console.log(`${newNote.title} has been writtne to the JSON file!`)
        }
       })
      }
    })

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting review');
  }
});

// get request/ wild card route that return index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))