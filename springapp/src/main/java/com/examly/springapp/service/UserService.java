package com.springboot.demo.service;

import java.util.Set;
import com.springboot.demo.model.User;
import com.springboot.demo.model.UserRole;

public interface UserService {
    
    public User createUser(User user,Set<UserRole> userRoles) throws Exception;
    
    public User getUser(String email);

}
