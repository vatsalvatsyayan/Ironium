package com.ironium.backendangular.service;

import com.ironium.backendangular.entity.Order;

public interface MyOrdersService {
    Order[] getMyOrders(String user_email);
}
