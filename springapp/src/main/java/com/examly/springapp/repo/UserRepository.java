package com.springboot.demo.repo;

import com.springboot.demo.model.EnrolledCourse;
import com.springboot.demo.model.User;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long>{
    
    public User findByEmail(String email);

}
