package com.examly.springapp.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.AppliedCourse;
import com.examly.springapp.service.AppliedCourseService;

@RestController
@CrossOrigin("*")
@RequestMapping("/appliedcourse")
public class AppliedCourseController {
	
	@Autowired
	private AppliedCourseService appliedCourseService;
	
	@PostMapping("/addAppliedCourse")
	public AppliedCourse add(@RequestBody AppliedCourse appliedCourse){
		return this.appliedCourseService.addAppliedCourse(appliedCourse);
	}
	
	@PutMapping("/editAppliedCourse")
	public AppliedCourse update(@RequestBody AppliedCourse appliedCourse){
		return this.appliedCourseService.updateAppliedCourse(appliedCourse);
	}
	
	@GetMapping("/viewAppliedCourse")
	public Set<AppliedCourse> appliedCourses(){
		return this.appliedCourseService.getAppliedCourses();
	}
	
	@GetMapping("/{applicationId}")
	public AppliedCourse appliedCourse(@PathVariable("applicationId")Long applicationId) {
		return this.appliedCourseService.getAppliedCourse(applicationId);
	}
	
	@DeleteMapping("/deleteAppliedCourse/{enrolledId}")
	public void deleteAppliedCourse(@PathVariable("enrolledId")Long enrolledId) {
		this.appliedCourseService.deleteAppliedCourse(enrolledId);
	}
	
}
