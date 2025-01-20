import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService, CartItem } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CartComponent implements OnInit {
  cartItems$!: Observable<CartItem[]>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems$ = this.cartService.getCartItems();
  }

  updateItemQuantity(item: CartItem, quantity: number): void {
    if (quantity > 0) {
      item.quantity = quantity;
      this.cartService.updateCartItem(item); // Call updateCartItem here
    }
  }

  removeItem(item: CartItem): void {
    this.cartService.removeItem(item.id); // Remove item by ID
  }

  calculateTotal(cartItems: CartItem[]): number {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  checkout(): void {
    console.log('Proceeding to checkout...');
  }
}
