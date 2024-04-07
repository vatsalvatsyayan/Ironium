import { Component } from '@angular/core';
import { BagService } from '../services/bag.service';
import { BagItem } from '../common/bag-item';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { Purchase } from '../common/purchase';
import { User } from '../common/user';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  bagItems: BagItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  storage: Storage = localStorage;
  
  constructor(private bagService: BagService,
              private checkoutService: CheckoutService,
              private router: Router) {}

  async ionViewWillEnter() {
    this.loadBagItems();
  }

  loadBagItems() {
    
    this.bagItems = this.bagService.loadBagItems();

    this.bagService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.bagService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

  }

  incrementQuantity(bagItem: BagItem){
    this.bagService.addToCart(bagItem);
}

  decrementQuantity(bagItem: BagItem)
  {
    this.bagService.decrementQuantity(bagItem);
  }

  processOrder()
  {
      let order = new Order();
      order.totalPrice = this.totalPrice;
      order.totalQuantity = this.totalQuantity;

      const bagItems = this.bagService.bagItems;

      let orderItems: OrderItem[] = bagItems.map(bagItem => new OrderItem(bagItem));

      let user = new User("VVa", "VVb", "vj@gmail.com", 1234567898, "12B", "Arawali");


      let purchase = new Purchase();
      purchase.order = order;
      purchase.orderItems = orderItems;
      purchase.user = user;

      this.checkoutService.placeOrder(purchase).subscribe(
        {
          next: response => {
              alert(`Your order has been received. \nOrder tracking number: ${response.orderTrackingNumber}`);
  
              // reset cart
              this.resetCart();
          },
          error: err => {
            alert(`There was an error: ${err.message}`);
          }        
        }
      );

  }

  resetCart() {
    // reset cart data
    this.bagService.bagItems = [];
    this.bagService.totalPrice.next(0);
    this.bagService.totalQuantity.next(0);
    this.bagService.computeCartTotals();

    // navigate back to products page
    this.router.navigateByUrl('/tabs/tab2');
  }

}
