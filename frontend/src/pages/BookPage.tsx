import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import CartSummary from "../components/CartSummary";
import Header from "../components/Header";

function BookPage(){
    const[selectedCategories, setSelectedCategories] = useState<string[]>([]);
    
    // include the header, category filter, and list of books
    return (
        <div className="container mt-4">
            <CartSummary/>
            <div className="row bg-primary text-white">
                <Header />
            </div>
            <div className="row">
                <div className="col-md-3">
                    <CategoryFilter selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories} />
                </div>
                <div className="col-md-9">
                    {/* call on BookList component */}
                    <BookList selectedCategories={selectedCategories} />
                </div>
            </div>
        </div>
    );
}

export default BookPage;
