import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0); // helps with dynamic pagination
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortedAsc, setSortedAsc] = useState(true); //for sorting the book names
    const navigate = useNavigate(); //enable navigation

    // Reset page number to 1 whenever selectedCategories change
    useEffect(() => {
        setPageNum(1);
    }, [selectedCategories]);

    useEffect(() => {
        const fetchBooks = async() => {
            //figure out path for the selected categories
            const categoryParams = selectedCategories.map((cat) => `bookTypes=${encodeURIComponent(cat)}`).join('&');
            
            //if there are categories selected, add that to the path
            const response = await fetch(`https://mission13-walker-backend.azurewebsites.net/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`);
            const data = await response.json();
            // set variables based on the filtered data
            setBooks(data.books);
            setTotalItems(data.totalBooks)
            setTotalPages(Math.ceil(totalItems / pageSize));
            console.log(selectedCategories);

        };
        fetchBooks();
    }, [pageSize, pageNum, totalItems, selectedCategories]);


    //let the user sort books alphabetically
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
            <table className="table table-striped table-hover">
                <thead className="thead-dark">
                    <tr>
                        {/* allows user to choose if it's sorted asc or desc */}
                        <td onClick={handleSort} style={{ cursor: 'pointer'}}>Title {sortedAsc ? '↑' : '↓'}</td> 
                        <td>Author</td>
                        <td>Publisher</td>
                        <td>ISBN</td>
                        <td>Classification</td>
                        <td>Category</td>
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
                            <td>{b.category}</td>
                            <td>{b.pageCount}</td>
                            <td>${b.price}</td>
                            {/* add button to add to cart, pass in book title, id, and price for the purchase page */}
                            <td>
                                <button className="btn" onClick={() => navigate(`/purchase/${b.title}/${b.bookId}/${b.price}`)}>
                                    Add to Cart
                                </button>
                            </td>
                        </tr>
                    )) 
                    }
                </tbody>
            </table>
            
            {/* call the pagination component */}
            <Pagination 
                currentPage = {pageNum}
                totalPages = {totalPages}
                pageSize = {pageSize}
                onPageChange = {setPageNum}
                onPageSizeChange = {(newSize) => {
                    setPageSize(newSize); 
                    setPageNum(1)}}
            />
        </>
    );
    
}

export default BookList;