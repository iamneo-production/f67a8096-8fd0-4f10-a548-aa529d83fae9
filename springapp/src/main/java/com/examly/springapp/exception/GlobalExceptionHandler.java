package com.examly.springapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class GlobalExceptionHandler {

	// handling specific exception
	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ErrorDetails> resourceNotFoundHandling(ResourceNotFoundException exception, WebRequest request){
		ErrorDetails errorDetails = 
				new ErrorDetails(exception.getMessage(),false);
		return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
	}
	
	@ExceptionHandler(ResourceFoundException.class)
	public ResponseEntity<ErrorDetails> resourceFoundHandling(ResourceFoundException exception, WebRequest request){
		ErrorDetails errorDetails = 
				new ErrorDetails(exception.getMessage(),false,exception.id);
		return new ResponseEntity<>(errorDetails, HttpStatus.CONFLICT);
	}
	
	@ExceptionHandler(InvalidCredentialsException.class)
	public ResponseEntity<ErrorDetails> invalidCredentialsHandling(InvalidCredentialsException exception, WebRequest request){
		ErrorDetails errorDetails = 
				new ErrorDetails(exception.getMessage(),false);
		return new ResponseEntity<>(errorDetails, HttpStatus.UNAUTHORIZED);
	}

	// handling global exception
	
//	@ExceptionHandler(Exception.class)
//	public ResponseEntity<?> globalExceptionHandling(Exception exception, WebRequest request){
//		ErrorDetails errorDetails = 
//				new ErrorDetails(new Date(), exception.getMessage(), request.getDescription(false));
//		return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
//	}
}