import { Injectable, inject } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { User } from '../models/user';
import { Jwtres } from '../models/jwtres';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  apiUri = '/api/users';
  authSubject = new BehaviorSubject(false);
  private token: string | null = null; // Corregido: inicializar como null

  constructor(private httpClient: HttpClient, private router: Router) {
    this.token = this.getToken();
  }

  private saveToken(token: string, expiresIn: string) {
    localStorage.setItem('token', token); // Actualizado: usar 'token' en lugar de 'accessToken'
    localStorage.setItem('expiresIn', expiresIn);
    this.token = token;
  }

  register(user: User): Observable<Jwtres> {
    return this.httpClient.post<Jwtres>(this.apiUri + '/signup', user).pipe(
      tap((res: Jwtres) => {
        if (res) {
          this.saveToken(res.token, res.expiresIn); // Actualizado: usar 'token' en lugar de 'accessToken'
        }
      })
    );
  }

  login(user: User): Observable<Jwtres> {
    return this.httpClient.post<Jwtres>(this.apiUri + '/login', user).pipe(
      tap((res: Jwtres) => {
        if (res) {
          this.saveToken(res.token, res.expiresIn); // Actualizado: usar 'token' en lugar de 'accessToken'
        }
      })
    );
  }

  loggedIn() {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    this.token = null; // Corregido: asignar null al campo token
    localStorage.removeItem('token');
    localStorage.removeItem('expiresIn');
    localStorage.removeItem('logged');
    this.router.navigate(['login']);
  }
}
