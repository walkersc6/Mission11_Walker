import { Book } from "../types/Book";

interface FetchBooksResponse {
    books: Book[];
    totalBooks: number;
}

// save api route as variable to make it easier to type the route
const API_URL = "https://mission13-walker-backend.azurewebsites.net/Book";

// retrieve all book records based on selected categories
export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    selectedCategories: string[]
) : Promise<FetchBooksResponse> => {
    try {
        const categoryParams = selectedCategories
        .map((cat) => `BookTypes=${encodeURIComponent(cat)}`)
        .join('&');

        const response = await fetch(
            `${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}${selectedCategories.length ? `&${categoryParams}` : ''}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch Books');
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching Books:', error);
        throw error;
    }
}

// add a new book to the database
export const addBook = async (newBook: Book): Promise<Book | void> => {
    try {
        const response = await fetch(`${API_URL}/Add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook)
        });

        if (!response.ok){
            throw new Error('Failed to add Book');
        }

        // Check if the response is empty before attempting to parse it as JSON.
        const text = await response.text();
        if(text){
            //Only return the response as JSON if it contains some content.
            return JSON.parse(text);
        } else {
            //Return null or some other default value if it is empty.
            return;
        }

    } catch (error) {
        console.error('Error adding Book', error);
        throw error;
    }
}

// update a book in the database, needs a bookId and the new info
export const updateBook = async (BookId: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${BookId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook)
        });

        return await response.json();
    } catch (error) {
        console.error('Error updating Book: ', error);
        throw error;
    }
};

// delete a book from the database, needs bookId, no need to return something
export const deleteBook = async (BookId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${BookId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete Book');
        }

    } catch (error) {
        console.error('Error deleting Book: ', error);
        throw error;
    }
}