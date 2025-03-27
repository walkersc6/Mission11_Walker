import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import { CartItem } from "../types/CartItem";

function PurchasePage() {
    const navigate = useNavigate();
    const { bookTitle, bookId, bookPrice }= useParams();
    const {addToCart} = useCart();
    const [quantity, setQuantity] = useState<number>(1);
    // calculate the subtotal of books based on quantity
    const subtotal = (quantity * Number(bookPrice)).toFixed(2);
    
    // handles what happens when a book is added to the cart
    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title: bookTitle || "No Project Found", 
            quantity,
            price: Number(bookPrice),
            subtotalPrice: parseFloat(subtotal)
        }
        addToCart(newItem);
        navigate('/cart')
    }

    return (
        <>
            <Header />
            <h2>{bookTitle}</h2>
            <h3>{bookPrice}</h3>

            <div>
                <label>Quantity</label>
                <input type="number" placeholder="Enter Quantity" min = "1" value={quantity} onChange={(x) => setQuantity(Number(x.target.value))}/>
                <br/>
                <label>Subtotal Price</label>
                <input type="number" value={subtotal} readOnly /> 
                <br />
                <br />
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <br />
            <button onClick={() => navigate('/')}>Go Back</button>
        </>
    );
}

export default PurchasePage;