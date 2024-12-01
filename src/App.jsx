import React, { useState } from 'react';
import './App.css';  // Keep your custom styles if you have them
import BookTable from './components/BookTable'; // Import the BookTable component
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    category: '',
    file: null,
  });

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    setNewBook({ ...newBook, file });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newBook.title);
      formData.append('author', newBook.author);
      formData.append('description', newBook.description);
      formData.append('category', newBook.category);
      if (newBook.file) {
        formData.append('file', newBook.file); // Append the file to the form data
      } else {
        console.error('No file selected'); // Log if no file is selected
      }

      // Debugging: Log the FormData contents
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // Send formData to the API
      const response = await fetch('http://127.0.0.1:8000/api/books/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        console.log('Book added successfully');
        setNewBook({
          title: '',
          author: '',
          description: '',
          category: '',
          file: null,
        }); // Reset the form
      } else {
        console.error('Failed to add book:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to add book:', error);
    }
  };

  return (
    <div className="App container mt-5">
      <BookTable />
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="author" className="form-label">Author</label>
          <input
            type="text"
            id="author"
            placeholder="Author"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input
            type="text"
            id="description"
            placeholder="Description"
            value={newBook.description}
            onChange={(e) => setNewBook({ ...newBook, description: e.target.value })}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <input
            type="text"
            id="category"
            placeholder="Category"
            value={newBook.category}
            onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
            required
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="file" className="form-label">File</label>
          <input
            type="file"
            id="file"
            accept="application/pdf,image/*" // Accept PDF and image files
            onChange={handleFileChange}
            required
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
      
    </div>
  );
}

export default App;