import { Component } from '@angular/core';
import { BagService } from '../services/bag.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  totalQuantity: number = 0;

  storage: Storage = localStorage;
  
  constructor(private bagService: BagService) {}

  async ionViewWillEnter() {
    this.updateBagStatus();
  }

  updateBagStatus(){

    this.bagService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );  

    if(this.totalQuantity === 0)
    {
      const storedValue = this.storage.getItem('totalQuantityValue');

      if(storedValue)
      {
        this.totalQuantity = parseInt(storedValue);
      }
    }

  }

}
