import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";
import Header from "../components/Header";
import "./Pages.css";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart, clearCart } = useCart();
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="page-shell">
            <Header />
            <div className="page-content">
                <div className="cart-page-header">
                    <h2>Your Cart</h2>
                    {totalItems > 0 && <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>}
                </div>

                {cart.length === 0 ? (
                    <p className="cart-empty">Your cart is empty — browse our catalogue to find something you'll love.</p>
                ) : (
                    <>
                        <div className="cart-table-wrapper">
                            <table className="cart-table">
                                <thead>
                                    <tr>
                                        <td>Book Title</td>
                                        <td>Qty</td>
                                        <td>Unit Price</td>
                                        <td>Subtotal</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart.map((item: CartItem) => (
                                        <tr key={item.bookId}>
                                            <td className="cart-title">{item.title}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item.price.toFixed(2)}</td>
                                            <td className="cart-subtotal">${item.subtotalPrice.toFixed(2)}</td>
                                            <td>
                                                <button className="btn-delete" onClick={() => removeFromCart(item.bookId)}>
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="cart-footer">
                            <div className="cart-total">
                                Total: <span>${totalAmount.toFixed(2)}</span>
                            </div>
                            <div className="cart-actions">
                                <button className="btn-clear" onClick={() => clearCart()}>Clear Cart</button>
                                <button className="btn-browse" onClick={() => navigate('/')}>Continue Browsing</button>
                                <button className="btn-checkout">Checkout</button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default CartPage;