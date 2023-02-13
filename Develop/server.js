const express = require('express');
const fs = require('fs');
const path = require('path');
const notes = require('./db/db.json');
const uuid = require('./helpers/uuid');

// setting port
const PORT = process.env.PORT || 3001;

// 
const app = express();

// get request to return indes.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// // get request that return notes.html at the /notes path
// app.get('/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '/public/notes.html'))
// });

// // get request that return notes from db
// app.get('/api/notes', (req,res) => {
//     res.json(notes);
// })

// app.post('/notes', (req, res) => {
//   // Log that a POST request was received
//   console.info(`${req.method} request received to add a review`);

//   // Destructuring assignment for the items in req.body
//   const { title, text } = req.body;

//   // If all the required properties are present
//   if (title && text) {
//     // Variable for the object we will save
//     const newNote = {
//       title,
//       text,
//       note_id: uuid(),
//     };

//     const response = {
//       status: 'success',
//       body: newNote,
//     };

//     console.log(response);
//     res.status(201).json(response);
//   } else {
//     res.status(500).json('Error in posting review');
//   }
// });

// get request/ wild card route that return index.html
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))