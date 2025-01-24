import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class UserDashboardComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  cartCount$!: Observable<number>;
  isMenuOpen = false;
  searchQuery = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      alert('Session expired. Please log in again.');
      this.authService.logout();
      return;
    }

    // Fetch Products
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data; // Initialize filteredProducts
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    // Initialize Cart Count
    this.cartCount$ = this.cartService.getCartCount();
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log(`${product.name} added to cart.`);
  }

  logout(): void {
    this.authService.logout();
    console.log('User logged out');
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  // Filter products based on the search query
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = this.products; // Show all products if query is empty
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }
  }
}
