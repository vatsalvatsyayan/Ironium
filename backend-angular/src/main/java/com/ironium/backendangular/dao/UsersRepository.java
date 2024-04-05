package com.ironium.backendangular.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.ironium.backendangular.entity.Users;


@RepositoryRestResource(collectionResourceRel = "users", path = "users")
@CrossOrigin
public interface UsersRepository extends JpaRepository<Users, Long> {

    Users findByEmail(@Param("email") String email);

}
