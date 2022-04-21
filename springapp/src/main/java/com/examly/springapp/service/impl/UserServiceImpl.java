package com.examly.springapp.service.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.ResourceFoundException;
import com.examly.springapp.model.User;
import com.examly.springapp.model.UserRole;
import com.examly.springapp.repo.RoleRepository;
import com.examly.springapp.repo.UserRepository;
import com.examly.springapp.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {
       
        User local=this.userRepository.findByEmail(user.getEmail());

        if(local!=null) throw new ResourceFoundException("User Already Present !!"); 
        else{
            for(UserRole ur:userRoles){
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            
            local=this.userRepository.save(user);

        }
        return local;
    }

    @Override
    public User getUser(String email) {
        
         return this.userRepository.findByEmail(email);
    }
    
}
