import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [CommonModule, RouterModule]
})
export class UserDashboardComponent implements OnInit {
  products: any[] = [];
  cartCount$!: Observable<number>;  // Cart count is now an Observable

  constructor(
    private productService: ProductService,
    private cartService: CartService  
  ) {}

  ngOnInit(): void {
    // Fetch products from the product service
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );

    // Now, cartCount$ is properly an Observable<number>
    this.cartCount$ = this.cartService.getCartCount();  // This works now
  }

  // Add product to the cart
  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log(`${product.name} added to cart.`);
  }
}
