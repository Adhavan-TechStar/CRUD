import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-offers',
  imports: [CommonModule, FormsModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.css'
})
export class OffersComponent implements OnInit{
products: any[] = []; // This array will hold the filtered products for Men

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Fetch only the products belonging to the Men category
    this.productService.getProductsByCategory('Offers').subscribe(
      (data) => {
        console.log('Fetched products for Offers category:', data); // Debug the response
        this.products = data; // Assign the filtered products to the products array
        console.log('Products assigned to component:', this.products); // Confirm component data
      },
      (error) => {
        console.error('Error fetching products:', error); // Handle any errors
      }
    );
  }

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    console.log(`${product.name} added to cart.`);
  }
}
