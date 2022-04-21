package com.examly.springapp.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.EnrolledCourse;
import com.examly.springapp.model.User;

public interface UserRepository extends JpaRepository<User,Long>{
    
    public User findByEmail(String email);

}
