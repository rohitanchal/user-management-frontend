import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private api = 'https://user-management-backend-production-f62b.up.railway.app/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string, user: any }>(`${this.api}/login`, { email, password }).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

  get token(): string | null {
    return typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  }

  isLoggedIn() {
    return !!this.token;
  }

  logout() {
    localStorage.removeItem('token');
  }
  
}
