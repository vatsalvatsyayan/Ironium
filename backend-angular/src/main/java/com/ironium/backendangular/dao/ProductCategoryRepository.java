package com.ironium.backendangular.dao;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ironium.backendangular.entity.ProductCategory;

import org.springframework.data.jpa.repository.JpaRepository;


@RepositoryRestResource(collectionResourceRel = "productCategory", path = "productCategory")
@CrossOrigin
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

    

}
