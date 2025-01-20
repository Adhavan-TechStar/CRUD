
import { Component, Input } from '@angular/core';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html', // Referencing the separate HTML file
  styleUrls: ['./product-card.component.css'],
  imports: [FormsModule, CommonModule,RouterModule]
})
export class ProductCardComponent {
  @Input() product: any;
  constructor(private cartService: CartService) {}
  addToCart() {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: 1,
      imageUrl: this.product.imageUrl,
    });
    console.log(`${this.product.name} added to cart.`);
  }
  
}
