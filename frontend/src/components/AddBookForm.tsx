import { useState } from 'react';
import { Book } from '../types/Book';
import { addBook } from '../api/BooksAPI';
import "./Forms.css";

interface AddBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const AddBookForm = ({ onSuccess, onCancel }: AddBookFormProps) => {
    const [formData, setFormData] = useState<Book>({
        bookId: 0,
        title: '',
        author: '',
        publisher: '',
        isbn: '',
        classification: '',
        category: '',
        pageCount: 0,
        price: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addBook(formData);
        onSuccess();
    };

    return (
        <div className="book-form-overlay">
            <div className="book-form-card">
                <div className="book-form-header">
                    <h2>Add New Book</h2>
                </div>
                <div className="book-form-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-grid">
                            <div className="form-field full-width">
                                <label>Title</label>
                                <input type="text" name="title" value={formData.title} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Author</label>
                                <input type="text" name="author" value={formData.author} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Publisher</label>
                                <input type="text" name="publisher" value={formData.publisher} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>ISBN</label>
                                <input type="text" name="isbn" value={formData.isbn} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Classification</label>
                                <input type="text" name="classification" value={formData.classification} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Category</label>
                                <input type="text" name="category" value={formData.category} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Page Count</label>
                                <input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} />
                            </div>
                            <div className="form-field">
                                <label>Price ($)</label>
                                <input type="number" name="price" value={formData.price} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn-secondary" onClick={onCancel}>Cancel</button>
                            <button type="submit" className="btn-primary">Add Book</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBookForm;