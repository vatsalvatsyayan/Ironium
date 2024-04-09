package com.ironium.backendangular.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ironium.backendangular.entity.Order;

@RepositoryRestResource
@CrossOrigin
public interface OrderRepository extends JpaRepository<Order, Long>  {

    Page<Order> findByUserEmailOrderByDateCreatedDesc(@Param("email") String email, Pageable pageable);

    Order[] findByUserIdOrderByDateCreatedDesc(@Param("userId") Long userId);
    
}
