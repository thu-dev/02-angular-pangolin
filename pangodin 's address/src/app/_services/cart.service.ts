import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
    items = [];
  
    addToCart(user) {
      this.items.push(user);
    }
  
    getItems() {
      return this.items;
    }
  
    clearCart() {
      this.items = [];
      return this.items;
    }
  }