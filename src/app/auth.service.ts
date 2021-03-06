import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  private _loginUrl = "http://localhost:3000/login"

  constructor(private http: HttpClient) { }

  loginUser(user: Object) {
    return this.http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    // !! prefixed to return boolean value
    return !!localStorage.getItem('token');
  }

  getToken() : string {
    return localStorage.getItem('token');
  }
}
