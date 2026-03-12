import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Header.css";

function Header() {
    const navigate = useNavigate();
    const { cart } = useCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <header className="site-header">
            {/* Brand */}
            <div className="header-brand" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
                <div className="header-brand-rule" />
                <div className="header-brand-text">
                    <h1 className="header-store-name">Hilton's Books</h1>
                    <p className="header-tagline">Est. &amp; Curated with Care</p>
                </div>
            </div>

            {/* Nav */}
            <nav className="header-nav">
                <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Catalogue</a>
                <a onClick={() => navigate('/admin')} style={{ cursor: 'pointer' }}>Admin</a>
            </nav>

            {/* Cart */}
            <button className="header-cart" onClick={() => navigate('/cart')} title={`Total: $${totalAmount.toFixed(2)}`}>
                <span className="header-cart-icon">🛒</span>
                <span className="header-cart-label">Cart</span>
                {totalItems > 0 && (
                    <>
                        <span className="header-cart-badge">{totalItems}</span>
                        <span className="header-cart-total">${totalAmount.toFixed(2)}</span>
                    </>
                )}
            </button>
        </header>
    );
}

export default Header;