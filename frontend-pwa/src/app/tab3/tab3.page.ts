import { Component } from '@angular/core';
import { BagService } from '../services/bag.service';
import { BagItem } from '../common/bag-item';

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
  
  constructor(private bagService: BagService) {}

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

}
