import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
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
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.isTokenExpired()) {
      alert('Session expired. Please log in again.');
      this.authService.logout();
      return;
    }

    this.preventBackNavigation(); // Add back navigation prevention logic

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

  // Prevent back navigation to login or home page
  preventBackNavigation(): void {
    history.pushState(null, '', location.href);
    window.onpopstate = () => {
      if (!this.authService.isLoggedIn()) {
        this.router.navigate(['/login']); // Redirect to login if not logged in
      } else {
        history.pushState(null, '', location.href); // Prevent navigation back
      }
    };
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log(`${product.name} added to cart.`);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']); // Navigate to login after logout
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
