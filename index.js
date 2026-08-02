const express = require('express');
const app = express();

app.use(express.json());

let notes = [];
let nextId = 1;

// Get all notes
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// Get a single note
app.get('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ error: 'Note not found' });
  res.json(note);
});

// Create a note
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'title and content are required' });
  }
  const note = { id: nextId++, title, content, createdAt: new Date() };
  notes.push(note);
  res.status(201).json(note);
});

// Update a note
app.put('/api/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  if (!note) return res.status(404).json({ error: 'Note not found' });
  const { title, content } = req.body;
  if (title) note.title = title;
  if (content) note.content = content;
  res.json(note);
});

// Delete a note
app.delete('/api/notes/:id', (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Note not found' });
  notes.splice(index, 1);
  res.json({ deleted: true });
});

app.listen(3001, () => console.log('Notes API running on port 3001'));
