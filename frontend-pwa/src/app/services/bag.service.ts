import { Injectable } from '@angular/core';
import { BagItem } from '../common/bag-item';
import { BehaviorSubject, Subject } from 'rxjs';
import { CheckoutService } from './checkout.service';
import { RegistrationService } from './registration.service';
import { Router } from '@angular/router';
import { Order } from '../common/order';
import { OrderItem } from '../common/order-item';
import { User } from '../common/user';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class BagService {

  bagItems: BagItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = localStorage;
  sessionStorage: Storage = sessionStorage;
  
  constructor(private checkoutService : CheckoutService,
              private registrationService: RegistrationService,
              private router: Router) {
  }

  addToCart(bagItem: BagItem)
  {
    // check if we already have the item in our cart 
    let alreadyExistsInBag: boolean = false;
    let existingBagItem: BagItem | undefined = undefined;

    if(this.bagItems.length > 0)
    {
      // find the item based on item id
      existingBagItem = this.bagItems.find( tempBagItem => tempBagItem.id === bagItem.id );

      alreadyExistsInBag = (existingBagItem != undefined);
    }

    if(alreadyExistsInBag && existingBagItem)
    {
      existingBagItem.quantity++;
    }
    else
    {
      this.bagItems.push(bagItem);
    }

    this.computeCartTotals();
  }

  decrementQuantity(bagItem: BagItem)
  {   
    if(this.bagItems.length <= 0)
    {
      console.log('returning as array is 0')
      return;
    }

    let alreadyExistsInBag: boolean = false;
    let existingBagItem: BagItem | undefined = undefined;

    existingBagItem = this.bagItems.find( tempBagItem => tempBagItem.id === bagItem.id );

    alreadyExistsInBag = (existingBagItem != undefined);

    if(alreadyExistsInBag && existingBagItem)
    {
      existingBagItem.quantity--;
      console.log('item exists in bag and qty is ' + existingBagItem.quantity);
    }
 
    if(existingBagItem?.quantity === 0)
    {
      this.removeFromCart(existingBagItem);
    }

    this.computeCartTotals();
  }

  removeFromCart(bagItem: BagItem)
  {
    if(this.bagItems.length > 0)
    {
      const itemindex = this.bagItems.findIndex(tempItem => tempItem.id === bagItem.id);

      if(itemindex > -1)
      {
        this.bagItems.splice(itemindex, 1);
      }
    }
  }


  computeCartTotals() 
  {
    if(this.bagItems.length < 0)
    {
      return;
    }

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentItem of this.bagItems)
    {
        totalQuantityValue += currentItem.quantity;
        totalPriceValue += (currentItem.unitPrice * currentItem.quantity); 
    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    // log cart data 
    this.logCartData(totalPriceValue, totalQuantityValue);

    // persist cart data
    this.persistBagItems(totalPriceValue, totalQuantityValue);
  }

  persistBagItems(totalPriceValue : number, totalQuantityValue : number) {
    this.storage.setItem('bagItems', JSON.stringify(this.bagItems));
    this.storage.setItem('totalPriceValue', totalPriceValue.toString());
    this.storage.setItem('totalQuantityValue', totalQuantityValue.toString());
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    
    console.log(`Contents of the cart`);
    for(let tempCartItem of this.bagItems)
    {
      const subTotalPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`name: ${tempCartItem.name}, quantity=${tempCartItem.quantity}, unitPrice:${tempCartItem.unitPrice}, subTotalPrice:${subTotalPrice}`);
    }

  }

  async processOrder()
  {
    const userEmail = this.sessionStorage.getItem('userEmail');  

    try{
      const isRegistered = await this.registrationService.checkIfUserIsRegistered(userEmail!);

      if(!isRegistered)
      {
        this.router.navigateByUrl('/register');
        return;
      }

    }
    catch (error) {
      console.error('Error:', error);
      // Handle error if needed
    }

    let order = new Order();
    order.totalPrice = parseFloat(this.storage.getItem('totalPriceValue')!);
    order.totalQuantity = parseFloat(this.storage.getItem('totalQuantityValue')!);

    const bagItems = this.bagItems;
    let orderItems: OrderItem[] = bagItems.map(bagItem => new OrderItem(bagItem));



    let purchase = new Purchase();
    purchase.order = order;
    purchase.orderItems = orderItems;
    purchase.user = this.registrationService.user;

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

  loadBagItems() : BagItem[] {

    if(this.bagItems.length === 0)
    {
      const storedValue = this.storage.getItem('bagItems');
      
      if(storedValue)
      {
        try
        {
          this.bagItems = JSON.parse(storedValue);
          this.computeCartTotals()
        } 
        catch (error)
        {
          console.error('Error parsing JSON:', error);
        }
      }
    }

    return this.bagItems;
  }

  resetCart() {
    // reset cart data
    this.bagItems = [];
    this.totalPrice.next(0);
    this.totalQuantity.next(0);
    this.computeCartTotals();

    // navigate back to products page
    this.router.navigateByUrl('/tabs/tab2');
  }

}
