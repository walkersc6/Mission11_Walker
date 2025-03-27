import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'; //import bootstrap css
import BookPage from './pages/BookPage';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PurchasePage from './pages/PurchasePage';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <>
    <CartProvider> {/* children (paths) have access to the functions in the cart provider*/}
      <Router>
        <Routes>
          <Route path="/" element={<BookPage />}/>
          <Route path='/purchase/:bookTitle/:bookId/:bookPrice' element={<PurchasePage />} />
          <Route path='/cart' element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
      
    </>
  )
}

export default App
