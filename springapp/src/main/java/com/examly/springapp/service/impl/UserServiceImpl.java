package com.springboot.demo.service.impl;

import java.util.Set;

import com.springboot.demo.exception.ResourceFoundException;
import com.springboot.demo.model.User;
import com.springboot.demo.model.UserRole;
import com.springboot.demo.repo.RoleRepository;
import com.springboot.demo.repo.UserRepository;
import com.springboot.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
