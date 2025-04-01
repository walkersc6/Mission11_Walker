import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';

// properties include a function for when the user Cancels and when a user submits Successfully
interface AddBookFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AddBookForm = ({ onSuccess, onCancel }: AddBookFormProps) => {
  // formData will contain all fields necessary to match the database
  const [formData, setFormData] = useState<Book>({
    bookId: 0,
    title: '',
    author: '',
    publisher: '',
    isbn: '',
    classification: '',
    category: '',
    pageCount: 0,
    price: 0
  });
  
  // handles changes to form inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // handles submissions to the database
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addBook(formData);
    onSuccess();
  };
  
  return (
    // Add Book Form
    <form onSubmit={handleSubmit}>
      <h2>Add New Book</h2>
      <div className="form-grid">
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Author:
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
          />
        </label>
        <label>
          Publisher:
          <input
            type="text"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
          />
        </label>
        <label>
          ISBN:
          <input
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
          />
        </label>
        <label>
          Classification:
          <input
            type="text"
            name="classification"
            value={formData.classification}
            onChange={handleChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Page Count:
          <input
            type="number"
            name="pageCount"
            value={formData.pageCount}
            onChange={handleChange}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </label>
        <br/>
        <button type="submit">
            Add Book
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddBookForm;