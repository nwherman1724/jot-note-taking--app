const express = require('express');
const path = require('path');
const notes = require('./db/db.json')

// setting port
const PORT = process.env.PORT || 3001;

// 
const app = express();

// get request to return indes.html
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// get request/ wild card route that return index.html
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// get request that return notes.html at the /notes path
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// get request that return notes from db
app.get('/api/notes', (req,res) => {
    res.json(notes);
})



app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`))