import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://localhost:7122/api/products'; // Base API URL

  constructor(private http: HttpClient) {}

  // Fetch all products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Fetch products by category
  getProductsByCategory(category: string): Observable<any[]> {
    const url = `${this.apiUrl}/category/${category}`;
    console.log('Fetching products by category:', url); // Debug the API URL
    return this.http.get<any[]>(url); // Return the filtered products
  }
}
