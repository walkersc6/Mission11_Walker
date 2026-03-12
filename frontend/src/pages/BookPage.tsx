import { useState } from "react";
import BookList from "../components/BookList";
import CategoryFilter from "../components/CategoryFilter";
import Header from "../components/Header";
import "./Pages.css";

function BookPage() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="page-shell">
            <Header />
            <div className="page-content">
                <div className="bookpage-layout">
                    <div>
                        <CategoryFilter
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                        />
                    </div>
                    <div>
                        <BookList selectedCategories={selectedCategories} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookPage;