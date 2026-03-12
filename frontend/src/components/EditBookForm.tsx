import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';
import "./Forms.css";

interface EditBookFormProps {
    book: Book;  // lowercase to avoid shadowing the Book type
    onSuccess: () => void;
    onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
    const [formData, setFormData] = useState<Book>({ ...book });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(formData.bookId, formData);
        onSuccess();
    };

    return (
        <div className="book-form-overlay">
            <div className="book-form-card">
                <div className="book-form-header">
                    <h2>Edit Book</h2>
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
                            <button type="submit" className="btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBookForm;