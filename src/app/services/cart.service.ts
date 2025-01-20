import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemsSubject: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(this.cartItems);
  private cartCountSubject: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private apiUrl = 'https://localhost:7122/api/products/cart-items'; // Backend URL

  constructor(private http: HttpClient) {
    this.updateCartCount(); // Ensure the count is updated initially
  }

  // Emit updated cart count
  private updateCartCount(): void {
    const total = this.cartItems.reduce((count, item) => count + item.quantity, 0);
    this.cartCountSubject.next(total);
  }

  // Fetch cart items
  getCartItems(): Observable<CartItem[]> {
    return this.cartItemsSubject.asObservable();
  }

  // Get cart count as Observable
  getCartCount(): Observable<number> {
    return this.cartCountSubject.asObservable();
  }
  

  // Add an item to the cart
  addToCart(product: CartItem): void {
    const existingItem = this.cartItems.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.cartItemsSubject.next(this.cartItems); // Emit updated cart items
    this.updateCartCount(); // Emit updated cart count
  }

  // Remove an item from the cart
  removeItem(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(this.cartItems); // Emit updated cart items
    this.updateCartCount(); // Emit updated cart count
  }

  // Update cart item quantity
  updateCartItem(item: CartItem): void {
    const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      existingItem.quantity = item.quantity;
      this.cartItemsSubject.next(this.cartItems); // Emit updated cart items
      this.updateCartCount(); // Emit updated cart count
    }
  }
}
