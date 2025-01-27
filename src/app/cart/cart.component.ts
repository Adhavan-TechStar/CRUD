import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Import AuthService

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>; // Observable for cart items
  totalPrice: number = 0; // Total price of cart items

  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService // Inject AuthService
  ) {}

  ngOnInit(): void {
    this.checkAuthentication(); // Ensure the user is authenticated

    // Fetch cart items as an observable
    this.cartItems$ = this.cartService.getCartItems();

    // Subscribe to update the total price dynamically
    this.cartItems$.subscribe((cartItems) => {
      this.totalPrice = this.calculateTotal(cartItems);
    });
  }

  // Check if the user is authenticated
  checkAuthentication(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      if (!isLoggedIn) {
        alert('You need to log in to access the cart.');
        this.router.navigate(['/login']); // Redirect to login if not authenticated
      }
    });
  }

  // Update item quantity in the cart
  updateItemQuantity(item: CartItem, quantity: number): void {
    if (quantity > 0) {
      const updatedItem = { ...item, quantity }; // Create a new object with updated quantity
      this.cartService.updateCartItem(updatedItem); // Update the item in the cart
    }
  }

  // Remove an item from the cart
  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.id); // Call the service to remove the item
  }

  // Calculate the total price of items in the cart
  calculateTotal(cartItems: CartItem[]): number {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  // Proceed to checkout
  checkout(): void {
    console.log('Proceeding to checkout...');
    // Additional checkout logic can be implemented here
  }
}
