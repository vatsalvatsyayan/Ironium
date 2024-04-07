package com.ironium.backendangular.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ironium.backendangular.entity.Order;

@RepositoryRestResource
@CrossOrigin
public interface OrderRepository extends JpaRepository<Order, Long>  {



}
