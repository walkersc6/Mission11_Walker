import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import AddBookForm from "../components/AddBookForm";
import EditBookForm from "../components/EditBookForm";

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(10);
    const [totalItems, setTotalItems] = useState<number>(0); // helps with pagination
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
                setTotalPages(Math.ceil(totalItems / pageSize))
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };    
        loadBooks();
    }, [pageSize, pageNum, totalItems]);

    // handles removal from database & confirms that the user wants to delete the book
    const handleDelete = async(bookId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this Book?');
        if (!confirmDelete) return;

        try {
            await deleteBook(bookId);
            setBooks(books.filter((p) => p.bookId !== bookId))
        } catch (error) {
            alert('Failed to delete Book. Please try again')
        }
    };

    if (loading) return <p>Loading Book...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    return (
        <div>
            <h1>Admin - Books</h1>
            
            {/* if the form is not showing, display the add button */}
            {!showForm && (
                <button 
                    className="btn btn-success mb-3" 
                    onClick={() => setShowForm(true)}
                >
                    Add Book
                </button>
            )}

            {/* if the form is showing, the submit button is clicked */}
            {showForm && (
                <AddBookForm 
                    // store all info in the form
                    onSuccess ={() => {
                        setShowForm(false); 
                        fetchBooks(pageSize, pageNum, []).then((data) => 
                            setBooks(data.books)
                    );
                    }   
                }
                // if they hit the cancel button, hide the form
                onCancel={() => setShowForm(false)}
                />
            )}

            {/* show edit form if editingBook is not null  */}
            {editingBook && (
                // save edits made when submit button is clicked
                <EditBookForm Book={editingBook} onSuccess={() => {
                    setEditingBook(null);
                    fetchBooks(pageSize, pageNum, []).then((data) => setBooks(data.books));
                }}
                // if cancel button is clicked, hide the form and set the book to edit as null
                onCancel={() => setEditingBook(null)}
                />
            )}

            {/* display all book records */}
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>PageCount</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                            <tr key = {b.bookId}>
                                <td>{b.bookId}</td>
                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.publisher}</td>
                                <td>{b.isbn}</td>
                                <td>{b.classification}</td>
                                <td>{b.category}</td>
                                <td>{b.pageCount}</td>
                                <td>${b.price.toFixed(2)}</td>
                                <td>
                                    <button 
                                        className="btn btn-primary btn-sm w-100 mb-1"
                                        onClick={() => setEditingBook(b)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm w-100"
                                        onClick = {() => handleDelete(b.bookId)}
                                    >Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            {/* Calls new pagination component */}
            <Pagination 
                currentPage = {pageNum}
                totalPages = {totalPages}
                pageSize = {pageSize}
                onPageChange = {setPageNum}
                onPageSizeChange = {(newSize) => {
                    setPageSize(newSize); 
                    setPageNum(1)}}
            />
        </div>
    )
};

export default AdminBooksPage;