import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private baseUrl = 'https://localhost:7122/api/users';

  constructor(private http: HttpClient) {}

  // Get all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Get a single user by ID
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Create a new user
  createUser(user: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, user);
  }

  // Update an existing user
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, user);
  }

  // Delete a user
  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // Validate user credentials for login (already in place)
  validateUser(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials);
  }

  // Check if email already exists during registration
  checkEmailExists(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/check-email?email=${encodeURIComponent(email)}`;
    return this.http.get<boolean>(url);
  }

  // Register a new user (optional: if you have a separate endpoint for registration)
  registerUser(user: any): Observable<any> {
    const url = `${this.baseUrl}/register`; // Assuming the backend has a /register endpoint for user registration
    return this.http.post<any>(url, user);
  }

}
