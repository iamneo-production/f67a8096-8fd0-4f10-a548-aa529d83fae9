package com.examly.springapp.config;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.examly.springapp.service.impl.UserDetailsServiceImpl;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter{

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceImpl;
   
    @Autowired
    private JwtUtils jwtUtil;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
       
       final String requestTokenHeader=request.getHeader("Authorization");
     
       String email=null;
       String jwtToken=null;
        
       if(requestTokenHeader!=null && requestTokenHeader.startsWith("Bearer ")){
        
           
        
           jwtToken=requestTokenHeader.substring(7);
           try {
            email=this.jwtUtil.extractEmail(jwtToken);
               
           } catch (Exception e) {
               e.printStackTrace();
               System.out.println("Token Expired");
           }
       }
       else{
           System.out.println("Invalid Token, does not start with Bearer string");
       }

       if(email!=null && SecurityContextHolder.getContext().getAuthentication()==null){
           final UserDetails userDetails=this.userDetailsServiceImpl.loadUserByUsername(email);
           if(this.jwtUtil.validateToken(jwtToken, userDetails)){
            UsernamePasswordAuthenticationToken usernamePasswordAuthentication=   new UsernamePasswordAuthenticationToken(userDetails,null,userDetails.getAuthorities());
            usernamePasswordAuthentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthentication);
           }
        }
        else{
            System.out.println("Invalid Token");
        }
        filterChain.doFilter(request, response);
    }
    
}
