import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";
import "./Pages.css";

function PurchasePage() {
    const navigate = useNavigate();
    const { bookTitle, bookId, bookPrice } = useParams();
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState<number>(1);
    const subtotal = (quantity * Number(bookPrice)).toFixed(2);

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title: bookTitle || "Unknown Title",
            quantity,
            price: Number(bookPrice),
            subtotalPrice: parseFloat(subtotal),
        };
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <div className="page-shell">
            <Header />
            <div className="page-content">
                <div className="purchase-card">
                    <div className="purchase-card-header">
                        <h2>{bookTitle}</h2>
                        <p>${Number(bookPrice).toFixed(2)} per copy</p>
                    </div>
                    <div className="purchase-card-body">
                        <div className="purchase-field">
                            <label>Quantity</label>
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>
                        <div className="purchase-field">
                            <label>Subtotal</label>
                            <input type="number" value={subtotal} readOnly />
                        </div>
                        <div className="purchase-actions">
                            <button className="btn-secondary" onClick={() => navigate('/')}>← Go Back</button>
                            <button className="btn-primary" onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PurchasePage;