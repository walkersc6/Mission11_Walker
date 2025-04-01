import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';

interface EditBookFormProps {
    Book: Book;
    onSuccess: () => void;
    onCancel: () => void;
}

const EditBookForm = ({ 
    Book, 
    onSuccess, 
    onCancel 
}: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({...Book});
  
  // when there's a change to the form inputs, it saves the new change to formData and such
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handles submission of changes made to the book
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateBook(formData.bookId, formData);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Edit Book</h2>
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
            value={(formData.price).toFixed(2)}
            onChange={handleChange}
          />
        </label>
        <br/>
        <button type="submit">
            Edit Book
        </button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;