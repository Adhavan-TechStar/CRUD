import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../services/cart.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Include FormsModule for [(ngModel)]
})
export class LayoutComponent implements OnInit {
  isMenuOpen: boolean = false; // State for the hamburger menu
  searchQuery: string = ''; // Search query string
  products: any[] = []; // All products
  filteredProducts: any[] = []; // Filtered products based on the search query
  cartCount$!: Observable<number>;


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    // Fetch all products on initialization
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = data; // Initialize filtered products
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
    this.cartCount$ = this.cartService.getCartCount();

  }

  // Method to toggle the menu
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // Method to close the menu
  closeMenu(): void {
    this.isMenuOpen = false;
  }
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log(`${product.name} added to cart.`);
  }
  // Filter products based on the search query
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = this.products; // Show all products if the search query is empty
    } else {
      const query = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(query)
      );
    }
  }
}
