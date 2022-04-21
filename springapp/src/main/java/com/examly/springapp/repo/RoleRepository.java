package com.springboot.demo.repo;

import com.springboot.demo.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long>{
    
}
