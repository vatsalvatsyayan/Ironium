import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { MyOrder } from '../common/my-order';
import { OrderItem } from '../common/order-item';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  private baseUrl = 'http://localhost:8080/api/orders/';
  private getMyOrdersUrl = this.baseUrl + 'myOrders?user_email='

  orderItems: OrderItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  
  sessionStorage: Storage = sessionStorage;

  constructor(private httpClient: HttpClient,
              private router: Router) { }

  getMyOrders() : Observable<MyOrder[]>{ 
    const email = this.sessionStorage.getItem('userEmail');    
    return this.httpClient.get<MyOrder[]>(this.getMyOrdersUrl + email);
  }
}
