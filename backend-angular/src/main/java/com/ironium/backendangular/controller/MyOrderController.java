package com.ironium.backendangular.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ironium.backendangular.entity.Order;
import com.ironium.backendangular.service.MyOrdersService;

@RestController
@RequestMapping("/api/orders")
public class MyOrderController {

    private MyOrdersService myOrdersService;

    public MyOrderController(MyOrdersService myOrdersService)
    {
        this.myOrdersService = myOrdersService;
    }

    @GetMapping("/myOrders")
    public Order[] getMyOrders(@RequestParam String user_email)
    {
        return this.myOrdersService.getMyOrders(user_email);
    }
}
