package com.examly.springapp.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.ResourceFoundException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.Institute;
import com.examly.springapp.repo.InstituteRepository;
import com.examly.springapp.service.InstituteService;

@Service
public class InstituteServiceImpl implements InstituteService{
	
	@Autowired
	private InstituteRepository instituteRepository;
	
	@Override
	public Institute addInstitute(Institute institute ) {
		Institute local=this.instituteRepository.findByInstituteEmail(institute.getInstituteEmail());
		if(local!=null) throw new ResourceFoundException("Institute Already Present !!");
		return this.instituteRepository.save(institute);
	}

	@Override
	public Institute updateInstitute(Institute institute) {
		// TODO Auto-generated method stub
		instituteRepository.findById(institute.getInstituteId()).orElseThrow(()->new ResourceNotFoundException("institute not found with id"));
		//Institute local=this.instituteRepository.findByInstituteEmail(institute.getInstituteEmail());
		//if(local!=null) throw new ResourceFoundException("institute with given email already present");

		Institute i1=instituteRepository.findById(institute.getInstituteId()).get();
		institute.setCreatedAt(i1.getCreatedAt());
		return this.instituteRepository.save(institute);
	}

	@Override
	public Set<Institute> getInstitutes() {
		// TODO Auto-generated method stub
		return new LinkedHashSet<>(this.instituteRepository.findAll());
	}

	@Override
	public Institute getInstitute(Long instituteId) {
		// TODO Auto-generated method stub
		this.instituteRepository.findById(instituteId).orElseThrow(() -> new ResourceNotFoundException("institute not found here "));
		return this.instituteRepository.findById(instituteId).get();
	}

	@Override
	public void deleteInstitute(Long instituteId) {
		// TODO Auto-generated method stub
		Institute local=this.instituteRepository.findById(instituteId).orElseThrow(() -> new ResourceNotFoundException("institute not found"));
		this.instituteRepository.delete(local);
	}
	
	public Set<Institute> getByKeyword(String keyword){
		  return instituteRepository.findByKeyword(keyword);
		 }


}
