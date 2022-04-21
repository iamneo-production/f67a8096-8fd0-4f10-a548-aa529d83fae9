package com.examly.springapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Role;

public interface RoleRepository extends JpaRepository<Role,Long>{
    
}
