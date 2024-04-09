import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { MyOrdersService } from '../services/my-orders.service';
import { MyOrder } from '../common/my-order';
import { OrderItem } from '../common/order-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  userEmail! : string | undefined;
  myOrders : MyOrder[] = [];
    
  constructor(private authService: AuthenticationService,
              private myOrderService: MyOrdersService,
              private router: Router) {
  }

  ionViewWillEnter() {
      this.userEmail = this.authService.userEmail;
      this.myOrderService.getMyOrders().subscribe((myOrders: MyOrder[]) => this.myOrders = myOrders);
  }

  showOrderListItems(orderItems: OrderItem[], totalPrice: number, totalQuantity: number)
  {
    this.myOrderService.orderItems = orderItems;
    this.myOrderService.totalPrice = totalPrice;
    this.myOrderService.totalQuantity = totalQuantity;
    this.router.navigateByUrl('/myOrderList');
  }

}
