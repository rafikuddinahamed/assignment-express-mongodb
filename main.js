// Import required modules
const express = require('express');
const mongoose = require('mongoose');

// Create an Express application
const app = express();

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/bookstore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Book schema
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
});

// Create a Book model
const Book = mongoose.model('Book', bookSchema);

// Configure middleware to parse JSON
app.use(express.json());

// Define routes for CRUD operations

// Create a new book
app.post('/books', (req, res) => {
  const { title, author, genre } = req.body;
  const newBook = new Book({ title, author, genre });
  newBook.save((err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send('Book created successfully');
    }
  });
});

// Get all books
app.get('/books', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(books);
    }
  });
});

// Get a specific book by ID
app.get('/books/:id', (req, res) => {
  const { id } = req.params;
  Book.findById(id, (err, book) => {
    if (err) {
      res.status(500).send(err);
    } else if (!book) {
      res.status(404).send('Book not found');
    } else {
      res.send(book);
    }
  });
});

// Update a book by ID
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title, author, genre } = req.body;
  Book.findByIdAndUpdate(id, { title, author, genre }, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('Book updated successfully');
    }
  });
});

// Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  Book.findByIdAndRemove(id, (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send('Book deleted successfully');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
