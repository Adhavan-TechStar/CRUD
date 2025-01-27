import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://localhost:7122/api/auth'; // Backend API base URL
  private isAuthenticated = new BehaviorSubject<boolean>(this.checkTokenValidity()); // Initialize with token validity

  constructor(private http: HttpClient, private router: Router) {}

  /**
   * Login: Sends user credentials to the backend and retrieves a JWT token.
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  /**
   * Logout: Clears local storage and updates authentication status.
   */
  logout(): void {
    localStorage.removeItem('authToken'); // Remove JWT token
    this.isAuthenticated.next(false); // Notify observers about logout
    this.router.navigate(['/login']); // Redirect to login page
  }

  /**
   * Save the authentication token to local storage and update the login status.
   */
  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token); // Store token
    this.isAuthenticated.next(true); // Notify observers about login
  }

  /**
   * Check if the user is authenticated.
   */
  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  /**
   * Synchronous check for user authentication status.
   */
  isUserAuthenticated(): boolean {
    return this.checkTokenValidity();
  }

  /**
   * Get the authentication token from local storage.
   */
  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Add Authorization header with the token for authenticated requests.
   */
  getAuthHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  /**
   * Decode the JWT token payload.
   */
  private decodeToken(token: string): any | null {
    try {
      const payload = token.split('.')[1]; // Extract the payload
      return JSON.parse(atob(payload)); // Decode the base64-encoded string
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  /**
   * Check if the token is valid (exists and not expired).
   */
  private checkTokenValidity(): boolean {
    const token = this.getAuthToken();
    if (!token) return false;

    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) return false;

    const expirationDate = new Date(payload.exp * 1000); // Convert exp to milliseconds
    return expirationDate > new Date(); // Check if token is still valid
  }

  /**
   * Check if the token is expired.
   */
  isTokenExpired(): boolean {
    return !this.checkTokenValidity();
  }

  /**
   * Handle automatic logout if the token expires.
   */
  handleTokenExpiration(): void {
    if (this.isTokenExpired()) {
      alert('Session expired. Please log in again.');
      this.logout();
    }
  }

  /**
   * Automatically extend session validity by refreshing the token.
   */
  refreshAuthToken(): Observable<any> {
    const token = this.getAuthToken();
    if (!token) return new Observable(observer => observer.error('No token found'));

    return this.http.post(`${this.apiUrl}/refresh-token`, { token });
  }

  /**
   * Automatically refresh the token and save it.
   */
  autoRefreshToken(): void {
    this.refreshAuthToken().subscribe(
      (response: any) => {
        if (response && response.token) {
          this.setAuthToken(response.token); // Save new token
          console.log('Token refreshed successfully.');
        } else {
          console.error('Failed to refresh token.');
          this.logout();
        }
      },
      (error) => {
        console.error('Error refreshing token:', error);
        this.logout();
      }
    );
  }
}
