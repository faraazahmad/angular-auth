import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthService {

  private _loginUrl = "http://localhost:3000/login"

  constructor(private http: HttpClient) { }

  loginUser(user: Object) {
    return this.http.post<any>(this._loginUrl, user);
  }
}
