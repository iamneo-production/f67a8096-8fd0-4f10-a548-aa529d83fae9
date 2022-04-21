package com.springboot.demo.service.impl;

import com.springboot.demo.exception.ResourceNotFoundException;
import com.springboot.demo.model.User;
import com.springboot.demo.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service 
public class UserDetailsServiceImpl implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String email) {
        
        User user=this.userRepository.findByEmail(email);
        
       if(user==null)throw new ResourceNotFoundException("Email not found !!");
       
        return user;
    }
    
}
