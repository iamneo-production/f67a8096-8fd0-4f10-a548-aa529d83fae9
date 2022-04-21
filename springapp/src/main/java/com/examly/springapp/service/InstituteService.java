package com.examly.springapp.service;

import java.util.Set;

import com.examly.springapp.model.Institute;

public interface InstituteService {
	public Institute addInstitute(Institute institute);
	
	public Institute updateInstitute(Institute institute);
	
	public Set<Institute> getInstitutes();
	
	public Institute getInstitute(Long instituteId);
	
	public void deleteInstitute(Long instituteId);

	public Set<Institute> getByKeyword(String keyword);
}
