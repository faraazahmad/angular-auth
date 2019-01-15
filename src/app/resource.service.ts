import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ResourceService {
  private resourceUrl: string = "http://localhost:3000/resource";

  constructor(private http: HttpClient) { }

  getResource() {
    return this.http.get<any>(this.resourceUrl)
  }
}
