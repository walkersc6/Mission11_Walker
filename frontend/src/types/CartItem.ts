// template for an item in the cart
export interface CartItem {
    bookId: number;
    title: string;
    quantity: number;
    price: number;
    subtotalPrice: number;
}