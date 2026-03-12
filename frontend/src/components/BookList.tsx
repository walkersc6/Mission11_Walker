import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";
import "./BookList.css";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortedAsc, setSortedAsc] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setPageNum(1);
    }, [selectedCategories]);

    useEffect(() => {
        const fetchBooks = async () => {
            const categoryParams = selectedCategories
                .map((cat) => `bookTypes=${encodeURIComponent(cat)}`)
                .join("&");
            const response = await fetch(
                `http://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ""}`
            );
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalBooks);
            setTotalPages(Math.ceil(totalItems / pageSize));
        };
        fetchBooks();
    }, [pageSize, pageNum, totalItems, selectedCategories]);

    const handleSort = () => {
        const sortedBooks = [...books].sort((a, b) => {
            if (a.title < b.title) return sortedAsc ? -1 : 1;
            if (a.title > b.title) return sortedAsc ? 1 : -1;
            return 0;
        });
        setBooks(sortedBooks);
        setSortedAsc(!sortedAsc);
    };

    return (
        <div className="booklist-wrapper">
            <div className="booklist-header">
                <h2>Our Collection</h2>
                <span>{totalItems} titles in stock</span>
            </div>

            <div className="booklist-table-area">
                <table className="book-table">
                    <colgroup>
                        <col className="col-title" />
                        <col className="col-author" />
                        <col className="col-publisher" />
                        <col className="col-category" />
                        <col className="col-pages" />
                        <col className="col-price" />
                        <col className="col-action" />
                    </colgroup>
                    <thead>
                        <tr>
                            <td className="sortable" onClick={handleSort}>
                                Title {sortedAsc ? "↑" : "↓"}
                            </td>
                            <td>Author</td>
                            <td>Publisher</td>
                            <td>Category</td>
                            <td>Pages</td>
                            <td>Price</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((b) => (
                            <tr key={b.bookId}>
                                <td className="title-cell">{b.title}</td>
                                <td className="author-cell">{b.author}</td>
                                <td className="publisher-cell">{b.publisher}</td>
                                <td>{b.category}</td>
                                <td>{b.pageCount}</td>
                                <td className="price-cell">${b.price.toFixed(2)}</td>
                                <td className="action-cell">
                                    <button
                                        className="btn-cart"
                                        onClick={() =>
                                            navigate(`/purchase/${b.title}/${b.bookId}/${b.price}`)
                                        }
                                    >
                                        Add to Cart
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination locked inside the card */}
            <div className="booklist-pagination">
                <Pagination
                    currentPage={pageNum}
                    totalPages={totalPages}
                    pageSize={pageSize}
                    onPageChange={setPageNum}
                    onPageSizeChange={(newSize) => {
                        setPageSize(newSize);
                        setPageNum(1);
                    }}
                />
            </div>
        </div>
    );
}

export default BookList;