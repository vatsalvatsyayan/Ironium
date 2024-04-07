import { Component } from '@angular/core';
import { BagService } from '../services/bag.service';
import { BagItem } from '../common/bag-item';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { Purchase } from '../common/purchase';
import { User } from '../common/user';
import { CheckoutService } from '../services/checkout.service';
import { Router } from '@angular/router';
import { RegistrationService } from '../services/registration.service';

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
  sessionStorage: Storage = sessionStorage;
  
  constructor(private bagService: BagService,
              private checkoutService: CheckoutService,
              private registrationService: RegistrationService,
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
    this.bagService.processOrder();  
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
