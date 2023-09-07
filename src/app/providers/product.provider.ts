import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductProvider {
  public baseUrl = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros';
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'authorId': '123456789',
  });
  
  constructor(private http: HttpClient) {}

 

  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bp/products`, { headers: this.headers });
  }

  getProduct( productId: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/bp/products/verification?id=${productId}`, { headers: this.headers });
  }

  createProducts( product: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/bp/products`, product, { headers: this.headers });
  }

  updatesProducts( product: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/bp/products`, product, { headers: this.headers });
  }

  deleteProducts( productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/bp/products?id=${productId}`, { headers: this.headers });
  }

}
