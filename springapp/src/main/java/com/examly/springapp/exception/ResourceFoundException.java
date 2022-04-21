package com.examly.springapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ResourceFoundException extends RuntimeException{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public long id;
	public ResourceFoundException(String message) {
		super(message);
	}

	public ResourceFoundException(String message, long studentId) {
		super(message);
		this.id=studentId;
		
	}
}
	
