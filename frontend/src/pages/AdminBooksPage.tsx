import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import AddBookForm from "../components/AddBookForm";
import EditBookForm from "../components/EditBookForm";
import Header from "../components/Header";
import "./Pages.css";

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNum, []);
                setBooks(data.books);
                setTotalItems(data.totalBooks);
                setTotalPages(Math.ceil(totalItems / pageSize));
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageSize, pageNum, totalItems]);

    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;
        try {
            await deleteBook(bookId);
            setBooks(books.filter((b) => b.bookId !== bookId));
        } catch {
            alert("Failed to delete book. Please try again.");
        }
    };

    if (loading) return <div className="page-shell"><Header /><p className="loading-state">Loading catalogue...</p></div>;
    if (error) return <div className="page-shell"><Header /><p className="loading-state">Error: {error}</p></div>;

    return (
        <div className="page-shell">
            <Header />

            {showForm && (
                <AddBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, pageNum, []).then((data) => setBooks(data.books));
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingBook && (
                <EditBookForm
                    book={editingBook}
                    onSuccess={() => {
                        setEditingBook(null);
                        fetchBooks(pageSize, pageNum, []).then((data) => setBooks(data.books));
                    }}
                    onCancel={() => setEditingBook(null)}
                />
            )}

            <div className="page-content">
                <div className="admin-toolbar">
                    <h1>Admin — Catalogue</h1>
                    <button className="btn-add" onClick={() => setShowForm(true)}>
                        + Add Book
                    </button>
                </div>

                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Publisher</th>
                                <th>ISBN</th>
                                <th>Classification</th>
                                <th>Category</th>
                                <th>Pages</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((b) => (
                                <tr key={b.bookId}>
                                    <td>{b.bookId}</td>
                                    <td className="title-cell">{b.title}</td>
                                    <td>{b.author}</td>
                                    <td>{b.publisher}</td>
                                    <td>{b.isbn}</td>
                                    <td>{b.classification}</td>
                                    <td>{b.category}</td>
                                    <td>{b.pageCount}</td>
                                    <td>${b.price.toFixed(2)}</td>
                                    <td>
                                        <div className="admin-actions">
                                            <button className="btn-edit" onClick={() => setEditingBook(b)}>Edit</button>
                                            <button className="btn-delete" onClick={() => handleDelete(b.bookId)}>Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={pageNum}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={setPageNum}
                    onPageSizeChange={(newSize) => { setPageSize(newSize); setPageNum(1); }}
                />
            </div>
        </div>
    );
};

export default AdminBooksPage;