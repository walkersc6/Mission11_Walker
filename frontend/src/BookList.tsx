import { useEffect, useState } from "react";
import { Book } from "./types/Book";

function BookList() {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortedAsc, setSortedAsc] = useState(true); //for sorting the book names

    useEffect(() => {
        const fetchBooks = async() => {
            const response = await fetch(`https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}`);
            const data = await response.json();
            setBooks(data.books);
            setTotalItems(data.totalBooks)
            setTotalPages(Math.ceil(totalItems / pageSize));

        };
        fetchBooks();
    }, [pageSize, pageNum, totalItems]);


    //let the user sort books 
    const handleSort = () => {
        const sortedBooks = [...books].sort((a, b) => {
        if (a.title < b.title) {
            return sortedAsc ? -1 : 1;
        }
        if (a.title > b.title) {
            return sortedAsc ? 1 : -1;
        }
        return 0;
        });

        setBooks(sortedBooks); //save books in sorted order
        setSortedAsc(!sortedAsc); // Toggle sorting order
    };

    return(
        <>
            <h2>Hilton's Books</h2>
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        {/* allows user to choose if it's sorted asc or desc */}
                        <td onClick={handleSort} style={{ cursor: 'pointer'}}>Title {sortedAsc ? '↑' : '↓'}</td> 
                        <td>Author</td>
                        <td>Publisher</td>
                        <td>ISBN</td>
                        <td>Classification/Category</td>
                        <td>Number of Pages</td>
                        <td>Price</td>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                        <tr key = {b.bookId}>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.publisher}</td>
                            <td>{b.isbn}</td>
                            <td>{b.classification}</td>
                            <td>{b.pageCount}</td>
                            <td>${b.price}</td>
                        </tr>
                    )) 
                    }
                </tbody>
            </table>
            
            {/* Buttons to navigate */}
            {/* Previous Button */}
            <button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>Previous</button>
            
            {/* create pagination dynamically based on how many records are shown  */}
            {
                [...Array(totalPages)].map((_, index) => (
                    <button key={index +1 } 
                    onClick={() => setPageNum(index + 1)} 
                    disabled = {pageNum === (index+ 1)}
                    >
                        {index + 1}
                    </button>
                ))         
            }

            {/* Next Button */}
            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br />
            {/* allow user to choose how many records are shown on a page */}
            <label>Results per page:
                <select value = {pageSize} 
                    onChange={
                        (p) => {
                            setPageSize(Number(p.target.value));
                            setPageNum(1);
                        }
                    }
                >
                    <option value = "5">5</option>
                    <option value = "10">10</option>
                    <option value = "15">15</option>
                </select>
            </label>

        </>
    );
    
}

export default BookList;