package com.ironium.backendangular.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.ironium.backendangular.entity.Product;

@RepositoryRestResource(collectionResourceRel = "product", path = "product")
@CrossOrigin
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
    
}
