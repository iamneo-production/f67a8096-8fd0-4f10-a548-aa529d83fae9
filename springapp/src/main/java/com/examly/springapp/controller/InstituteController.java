package com.examly.springapp.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Institute;
import com.examly.springapp.service.InstituteService;



@RestController
@CrossOrigin("*")
@RequestMapping("/institute")

public class InstituteController {
	
	@Autowired
	private InstituteService instituteService;
	
	 @PostMapping("/addInstitute")
	 public Institute addInstitute(@RequestBody Institute institute){
		 Institute institute1=this.instituteService.addInstitute(institute);
		 return institute1;
	 }
	 
	 @GetMapping("/{instituteId}")
	 public Institute getInstitute(@PathVariable("instituteId")Long instituteId) {
		 return this.instituteService.getInstitute(instituteId);
	 }
	 
	 @GetMapping("/viewInstitute")
	 public Set<Institute> getInstitutes(){
		 return this.instituteService.getInstitutes();
	 }
	 
	 @PutMapping("/editInstitute")
	 public Institute updateInstitute(@RequestBody Institute institute) {
		 return this.instituteService.updateInstitute(institute);
	 }
	 
	 @DeleteMapping("/deleteInstitute/{instituteId}")
	 public void deleteinstitute(@PathVariable("instituteId")Long instituteId) {
		 this.instituteService.deleteInstitute(instituteId);
	 }
	 
	 @GetMapping("/search/{keyword}")
	 public Set<Institute> search(@PathVariable(value = "keyword", required = false)String keyword,Institute institute, Model model) {
		  if(keyword.length()>0) {
		   Set<Institute> list = instituteService.getByKeyword(keyword);
		   return list;
		  }
		  else {
		  Set<Institute> list = instituteService.getInstitutes();
		  return list;
		  }
		  
		  
		 }
}
