import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl = 'http://localhost:8080/api/checkout';

  private placeOrderUrl = this.baseUrl + '/placeOrder';

  placeOrder(purchase: Purchase) : Observable<any>{
    return this.httpClient.post<Purchase>(this.placeOrderUrl,purchase);
  }

}
