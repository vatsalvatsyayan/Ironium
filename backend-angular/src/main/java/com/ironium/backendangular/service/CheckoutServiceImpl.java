package com.ironium.backendangular.service;

import java.util.Set;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.ironium.backendangular.dao.UsersRepository;
import com.ironium.backendangular.dto.Purchase;
import com.ironium.backendangular.dto.PurchaseResponse;
import com.ironium.backendangular.entity.Order;
import com.ironium.backendangular.entity.OrderItem;
import com.ironium.backendangular.entity.Users;

import jakarta.transaction.Transactional;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private UsersRepository userRepository;

    public CheckoutServiceImpl(UsersRepository userRepository)
    {
        this.userRepository = userRepository;
    }
    
    @Override
    @Transactional
    public PurchaseResponse placeOrder(Purchase purchase) {
        
        Order order = purchase.getOrder();

        String orderTrackingNumber = generateOrderTrackingNumber();

        order.setOrderTrackingNumber(orderTrackingNumber);
        Set<OrderItem> orderItems = purchase.getOrderItems();
        orderItems.forEach(item -> order.add(item));

        Users user = purchase.getUser();

        String userEmail = user.getEmail();

        Users userFromDb = userRepository.findByEmail(userEmail);

        if(userFromDb != null)
        {
            user = userFromDb;
        }

        user.add(order);
        
        userRepository.save(user);
        
        return new PurchaseResponse(orderTrackingNumber);
    }

    private String generateOrderTrackingNumber() 
    {
        return UUID.randomUUID().toString();
    }

}
