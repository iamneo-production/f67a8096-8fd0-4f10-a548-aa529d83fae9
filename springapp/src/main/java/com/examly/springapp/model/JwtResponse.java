package com.examly.springapp.model;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;

public class JwtResponse {


    String token;
    String email;
    Collection<? extends GrantedAuthority> roles;

    public JwtResponse(String token, String email, Collection<? extends GrantedAuthority> roles) {
        this.token = token;
        this.email=email;
        this.roles=roles;
        
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Collection<? extends GrantedAuthority> getCollection() {
		return roles;
	}

	public void setCollection(Collection<? extends GrantedAuthority> roles) {
		this.roles = roles;
	}
    
    
    
}
