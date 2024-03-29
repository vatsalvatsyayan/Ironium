import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductCategory } from '../common/product-category';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  private baseUrl = 'http://localhost:8080/api';

  private categoryUrl =  this.baseUrl + '/productCategory';

  private productUrl = this.baseUrl + '/product';

  private productByCategoryIdUrl = this.productUrl + '/search/findByCategoryId?id=';

  
  constructor(private httpClient: HttpClient) { }

  getProductCategories() : Observable<ProductCategory[]> {
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
        map(response => response._embedded.productCategory)
    );
  }

  getProductsByCategoryId(categoryId : number) : Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(this.productByCategoryIdUrl + categoryId.toString()).pipe(
        map(response => response._embedded.product)
    );
  }

}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

interface GetResponseProduct {
  _embedded: {
    product: Product[];
  }
}