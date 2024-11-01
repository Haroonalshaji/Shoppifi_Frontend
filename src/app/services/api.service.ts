import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // baseUrl = "https://shoppifi-backend.onrender.com"
  baseUrl = "http://localhost:3000"

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(`${this.baseUrl}/user/register`, user)
  }

  login(user: any) {
    return this.http.post(`${this.baseUrl}/user/login`, user)
  }

  getAllProducts() {
    return this.http.get(`${this.baseUrl}/all-products`)
  }

  getAProduct(id: any) {
    return this.http.get(`${this.baseUrl}/product/${id}`)
  }

  appendToken() {
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem('token');
    if (token) {
      headers = headers.append("Authorization", `Bearer ${token}`)
    }
    return { headers }
  }

  addToWishlist(product: any) {
    return this.http.post(`${this.baseUrl}/wishlist`, product, this.appendToken())
  }

  getWishlist() {
    return this.http.get(`${this.baseUrl}/get-wishlist`, this.appendToken())
  }

  deleteAnItem(id: any) {
    return this.http.delete(`${this.baseUrl}/delete-wishlist/${id}`, this.appendToken())
  }

  addToCart(product: any) {
    return this.http.post(`${this.baseUrl}/add-cart`, product, this.appendToken())
  }

  addToCartFromWishlist(product: any) {
    return this.http.post(`${this.baseUrl}/add-to-cart-fromWishlist`, product, this.appendToken());
  }


  getCart() {
    return this.http.get(`${this.baseUrl}/get-cart`, this.appendToken())
  }

  deleteItemfromCart(id: any) {
    return this.http.delete(`${this.baseUrl}/delete-cart/${id}`, this.appendToken())
  }

  decrementItemFromCart(products: any, id: any) {
    return this.http.post(`${this.baseUrl}/decrement-cart/${id}`, products, this.appendToken())
  }

}
