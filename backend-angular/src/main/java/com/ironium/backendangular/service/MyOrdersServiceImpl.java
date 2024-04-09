package com.ironium.backendangular.service;

import org.springframework.stereotype.Service;

import com.ironium.backendangular.dao.OrderRepository;
import com.ironium.backendangular.dao.UsersRepository;
import com.ironium.backendangular.entity.Order;
import com.ironium.backendangular.entity.Users;

@Service    
public class MyOrdersServiceImpl implements MyOrdersService{

    private UsersRepository usersRepository;
    private OrderRepository orderRepository;

    public MyOrdersServiceImpl(UsersRepository usersRepository, OrderRepository orderRepository)
    {
        this.usersRepository = usersRepository;
        this.orderRepository = orderRepository;
    }
    
    @Override
    public Order[] getMyOrders(String user_email) {
        
        Users user = usersRepository.findByEmail(user_email);

        if(user == null)
        {
            return null;
        }

        Order[] orders = orderRepository.findByUserIdOrderByDateCreatedDesc(user.getId());

        return orders;
    }

}
