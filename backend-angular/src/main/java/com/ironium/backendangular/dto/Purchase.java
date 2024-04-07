package com.ironium.backendangular.dto;

import java.util.Set;

import com.ironium.backendangular.entity.Order;
import com.ironium.backendangular.entity.OrderItem;
import com.ironium.backendangular.entity.Users;

import lombok.Data;

@Data
public class Purchase {

    private Users user;
    private Order order;
    private Set<OrderItem> orderItems;

}
