package com.examly.springapp.service;

import java.util.Set;

import com.examly.springapp.model.User;
import com.examly.springapp.model.UserRole;

public interface UserService {
    
    public User createUser(User user,Set<UserRole> userRoles) throws Exception;
    
    public User getUser(String email);

}
