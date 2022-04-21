package com.examly.springapp.exception;

public class ErrorDetails {
	private String message;
	private boolean flag;
	private long id;
	
	public ErrorDetails(String message, boolean flag) {
		super();
		this.message = message;
		this.flag = flag;
	}
	
	public ErrorDetails(String message, boolean flag, long id) {
		super();
		this.message = message;
		this.flag = flag;
		this.id = id;
	}

	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean getflag() {
		return flag;
	}
	public void setflag(boolean flag) {
		this.flag = flag;
	}
}