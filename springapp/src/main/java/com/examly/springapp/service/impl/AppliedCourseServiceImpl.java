package com.examly.springapp.service.impl;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.ResourceFoundException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.AppliedCourse;
import com.examly.springapp.model.EnrolledCourse;
import com.examly.springapp.repo.AppliedCourseRepository;
import com.examly.springapp.repo.EnrolledCourseRepository;
import com.examly.springapp.service.AppliedCourseService;

@Service
public class AppliedCourseServiceImpl implements AppliedCourseService{

	@Autowired
	private AppliedCourseRepository appliedCourseRepository;
	@Autowired
	private EnrolledCourseRepository enrollCourseRepository;
	
	@Override
	public AppliedCourse addAppliedCourse(AppliedCourse appliedCourse) {
		// TODO Auto-generated method stub
		if(this.appliedCourseRepository.findByappliedcourse(appliedCourse.getStudent().getStudentId(),appliedCourse.getCourse().getCourseId())!=null) 
			throw new ResourceFoundException("Course Already enrolled !!"); 
		EnrolledCourse enrolledCourse=new EnrolledCourse();
		enrolledCourse.setJoinedDate(appliedCourse.getUpdatedAt());
		enrolledCourse.setCourseStatus("started");
		enrolledCourse.setCourse(appliedCourse.getCourse());
		enrolledCourse.setStudent(appliedCourse.getStudent());
		enrolledCourse.setUser(appliedCourse.getUser());
		this.enrollCourseRepository.save(enrolledCourse);
		return this.appliedCourseRepository.save(appliedCourse);
		
	}

	@Override
	public AppliedCourse updateAppliedCourse(AppliedCourse appliedCourse) {
		// TODO Auto-generated method stub		
		this.appliedCourseRepository.findById(appliedCourse.getApplicationId())
		.orElseThrow(()->new ResourceNotFoundException("applied course not found to update in this id : "+appliedCourse.getApplicationId()));
		AppliedCourse c1=appliedCourseRepository.findById(appliedCourse.getApplicationId()).get();
		if(c1!=null) throw new ResourceFoundException("Not applied for this course !!"); 
		appliedCourse.setCreatedAt(c1.getCreatedAt());
		appliedCourse.setApplicationDate(c1.getApplicationDate());
//		if(appliedCourse.getApplicationStatus().equalsIgnoreCase("accepted"))
//		{
//			EnrolledCourse enrolledCourse=new EnrolledCourse();
//			enrolledCourse.setJoinedDate(appliedCourse.getUpdatedAt());
//			enrolledCourse.setCourseStatus("started");
//			enrolledCourse.setCourse(appliedCourse.getCourse());
//			enrolledCourse.setStudent(appliedCourse.getStudent());
//			this.enrollCourseRepository.save(enrolledCourse);
//		}
		return this.appliedCourseRepository.save(appliedCourse);
	}

	@Override
	public Set<AppliedCourse> getAppliedCourses() {
		// TODO Auto-generated method stub
		return new HashSet<>(this.appliedCourseRepository.findAll());
	}

	@Override
	public AppliedCourse getAppliedCourse(Long applicationId) {
		// TODO Auto-generated method stub
		this.appliedCourseRepository.findById(applicationId)
		.orElseThrow(()->new ResourceNotFoundException("applied course not found to update in this id : "+applicationId));
		return this.appliedCourseRepository.findById(applicationId).get();
	}

	@Override
	public void deleteAppliedCourse(Long applicationId) {
		// TODO Auto-generated method stub
		this.appliedCourseRepository.findById(applicationId)
		.orElseThrow(()->new ResourceNotFoundException("applied course not found to update in this id : "+applicationId));
		AppliedCourse appliedCourse =new AppliedCourse();
		appliedCourse.setApplicationId(applicationId);
		this.appliedCourseRepository.delete(appliedCourse);
	}

}
