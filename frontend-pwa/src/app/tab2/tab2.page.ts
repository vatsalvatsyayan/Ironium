import { Component } from '@angular/core';
import { OrderServiceService } from '../services/order-service.service';
import { ProductCategory } from '../common/product-category';
import { Product } from '../common/product';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  productCategories: ProductCategory[] = [];

  productsByCategory: {[categoryId : number]: Product[] } = {};

  constructor(private orderService: OrderServiceService) {}

  async ionViewWillEnter() {
    await this.listProductCategories();
    this.listProductsByCategoryId();
  }


  async listProductCategories() {
    this.productCategories = await firstValueFrom(this.orderService.getProductCategories());
  }

  listProductsByCategoryId() {
    this.productCategories.forEach(prodCategory => {
      this.orderService.getProductsByCategoryId(prodCategory.id)
      .subscribe(products => {
        this.productsByCategory[prodCategory.id] = products;
      });
    }

    );
  }

}
