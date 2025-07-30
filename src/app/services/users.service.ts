import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  role: string;
}

@Injectable({ providedIn: 'root' })

export class UsersService {

  private api = 'https://user-management-backend-production-f62b.up.railway.app/api/users'; // live url

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<{ data: User[] }>(this.api).pipe(
      map(res => res.data)
    );
  }

  createUser(user: User): Observable<User> {
    return this.http.post<{ data: User }>(this.api, user).pipe(map(res => res.data));
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<{ data: User }>(`${this.api}/${user._id}`, user).pipe(map(res => res.data));
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

}
