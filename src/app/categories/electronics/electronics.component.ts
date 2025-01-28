import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-electronics',
  imports: [CommonModule, FormsModule],
  templateUrl: './electronics.component.html',
  styleUrl: './electronics.component.css'
})
export class ElectronicsComponent implements OnInit{
  products: any[] = []; // This array will hold the filtered products for Electronics

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Fetch only the products belonging to the Electronics category
    this.productService.getProductsByCategory('Electronics').subscribe(
      (data) => {
        console.log('Fetched products for Electronics category:', data); // Debug the response
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
