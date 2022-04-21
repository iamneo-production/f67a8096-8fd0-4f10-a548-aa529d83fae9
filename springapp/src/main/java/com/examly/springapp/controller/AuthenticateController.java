package com.examly.springapp.controller;


import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.config.JwtUtils;
import com.examly.springapp.exception.InvalidCredentialsException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.JwtRequest;
import com.examly.springapp.model.JwtResponse;
import com.examly.springapp.model.User;
import com.examly.springapp.service.impl.UserDetailsServiceImpl;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@CrossOrigin("*")
@RequestMapping("/user")
@RestController
public class AuthenticateController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
    
    @Autowired
    private JwtUtils jwtUtils;

    @CrossOrigin("*")
    @PostMapping("/signin")
    public ResponseEntity<?> generateToken(@RequestBody JwtRequest jwtRequest) throws Exception{
       
//        try {
            
            authenticate(jwtRequest.getEmail(), jwtRequest.getPassword());
//        } catch (Exception e) {
//            e.printStackTrace();
//            String exc=e.toString();
//            throw new ResourceNotFoundException(exc);
//        }
       

        UserDetails userDetails=this.userDetailsServiceImpl.loadUserByUsername(jwtRequest.getEmail());
        String token = this.jwtUtils.generateToken(userDetails);        
        return ResponseEntity.ok(new JwtResponse(token,userDetails.getUsername(),userDetails.getAuthorities()));
    }
    private void authenticate(String email,String password) throws Exception{
       
        try {
            
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(email,password));
        } catch (DisabledException e) {
             throw new ResourceNotFoundException("Email not found ");
        }
        catch(BadCredentialsException e){
            throw new InvalidCredentialsException("Invalid Credentials ");
        }

    }
    @GetMapping("/current-user")
    public User getCurrentUser(Principal principal){
        return (User)this.userDetailsServiceImpl.loadUserByUsername(principal.getName());
    }
   
}
