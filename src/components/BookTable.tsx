import React, { useState, useEffect } from 'react';
import { Download, Pencil, Plus } from 'lucide-react';

// Define the book type
type Book = {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
};

// API URL
const API_URL = 'http://127.0.0.1:8000/api/books/';

const BookTable = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch books
  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new book
  
  const handleDownload = (book : Book) => {
    fetch(`http://127.0.0.1:8000/api/books/${book.id}/download/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to download the file');
        }
        return response.blob();  // Convert the response to a Blob object
      })
      .then((blob) => {
        // Create a download link and trigger a download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); // Create an object URL for the blob
        link.download = `${book.title}.pdf`;  // Set the file name for download
        link.click();  // Simulate a click to trigger the download
      })
      .catch((error) => {
        console.error('Download failed:', error);
      });
  };
  
  // Modify a book
  

  useEffect(() => {
    fetchBooks();
  }, []);

  // Filter books based on search term
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    
    <div className="book-table">
      
      <div className="scroll-container">
        <div className="book-scroller">
          {loading ? (
            <p>Loading books...</p>
          ) : (
            filteredBooks.map((book) => (
              <div key={book.id} className="book-card">
                <img
                  src={book.cover || 'https://img.freepik.com/free-vector/blank-book-cover-vector-illustration-gradient-mesh-isolated-object-design-branding_587448-952.jpg'}
                  alt={book.title}
                  className="book-cover"
                />
                <div className="book-info">
                  <h4 className="book-title">{book.title}</h4>
                  <p className="book-author">{book.author}</p>
                  <p className="book-category">{book.category}</p>
                  <div className="actions">
                  <button
                      className="btn download-btn"
                      onClick={() => handleDownload(book)} // Fixed here
                    >
                      <Download size={14} /> Download
                    </button>
                    
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <style>
        {`
        .book-table {
          padding: 20px;
          background-color: #f9f9f9;
          min-height: 100vh;
          font-family: Arial, sans-serif;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .search-input {
          width: 70%;
          padding: 10px;
          border: 2px solid #007bff;
          border-radius: 8px;
          font-size: 14px;
        }

        .add-btn {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .add-btn svg {
          margin-right: 8px;
        }

        .scroll-container {
          overflow-x: auto;
          padding-bottom: 10px;
        }

        .book-scroller {
          display: flex;
          gap: 16px;
          padding: 10px 0;
        }

        .book-card {
          background: white;
          width: 200px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .book-card:hover {
          transform: scale(1.05);
        }

        .book-cover {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .book-info {
          padding: 12px;
          text-align: center;
        }

        .book-title {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 6px;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }

        .book-author {
          font-size: 14px;
          color: #555;
        }

        .book-category {
          font-size: 12px;
          color: #007bff;
          margin-bottom: 10px;
        }

        .actions {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .btn {
          border: none;
          background: none;
          cursor: pointer;
          font-size: 12px;
          display: flex;
          align-items: center;
          color: #555;
          transition: color 0.2s ease;
        }

        .btn:hover {
          color: #007bff;
        }

        .btn svg {
          margin-right: 4px;
        }

        .download-btn {
          color: #28a745;
        }

        .modify-btn {
          color: #ffc107;
        }
      `}
      </style>
    </div>
  );
};

export default BookTable;
