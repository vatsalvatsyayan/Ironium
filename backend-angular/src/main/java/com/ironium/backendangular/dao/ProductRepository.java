package com.ironium.backendangular.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.ironium.backendangular.entity.Product;

@RepositoryRestResource(collectionResourceRel = "product", path = "product")
public interface ProductRepository extends JpaRepository<Product, Long> {

}
