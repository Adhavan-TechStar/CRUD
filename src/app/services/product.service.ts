import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7122/api/products'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  getProductsByCategory(category: string): Observable<any[]> {
    const url = `${this.apiUrl}?category=${category}`; // Assuming your API supports category-based filtering
    return this.http.get<any[]>(url);
  }
}

