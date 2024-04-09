import { Component, OnInit } from '@angular/core';
import { MyOrdersService } from '../services/my-orders.service';
import { OrderItem } from '../common/order-item';

@Component({
  selector: 'app-myorderlist',
  templateUrl: './myorderlist.component.html',
  styleUrls: ['./myorderlist.component.scss'],
})
export class MyorderlistComponent  implements OnInit {

  myOrder: OrderItem[] = [];
  totalQuantity: number = 0;
  totalPrice: number = 0;
  
  constructor(private myOrdersService: MyOrdersService) { }

  ngOnInit() {
    this.myOrder = this.myOrdersService.orderItems;
    this.totalPrice = this.myOrdersService.totalPrice;
    this.totalQuantity = this.myOrdersService.totalQuantity;
  }

}
