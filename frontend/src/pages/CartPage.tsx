import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const {cart, removeFromCart, clearCart} = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    return(
        <div>
            <h2>Your Cart</h2>
            <div>
                {/* If there are items in the cart, display the title, price, quantity, and subtotal for each item */}
                {cart.length === 0 ? <p>Your cart is empty.</p> 
                    : <table>
                        <thead>
                            <tr>
                                <td>Book Title</td>
                                <td>Quantity</td>
                                <td>Price</td>
                                <td>Subtotal</td>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item: CartItem) => 
                                <tr key = {item.bookId}>
                                    <td>{item.title}</td>
                                    <td>{item.quantity}</td>
                                    {/* Display the price for the individual book */}
                                    <td>${item.price}</td>
                                    {/* subtotal */}
                                    <td>${item.subtotalPrice.toFixed(2)}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(item.bookId)}>
                                            Remove
                                        </button>
                                    </td>
                                    {/* <td hidden>totalAmount </td> */}
                                </tr>)
                            }
                        </tbody>
                        
                    </table>
                }
            </div>

            {/* display the total price */}
            <h4>Total: ${totalAmount.toFixed(2)}</h4>
           
            {/* button options to checkout, keep browsing, or clear cart */}
            <button>Checkout</button>
            <button onClick={() => navigate('/')}>Continue Browsing</button>
            <br />
            <button className="btn btn-danger" onClick={() =>clearCart()}>
                Clear Entire Cart
            </button>
        </div>
    )
}

export default CartPage;