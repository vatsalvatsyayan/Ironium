package com.ironium.backendangular.service;

import com.ironium.backendangular.dto.Purchase;
import com.ironium.backendangular.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);

}
