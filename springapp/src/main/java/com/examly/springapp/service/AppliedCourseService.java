package com.examly.springapp.service;

import java.util.Set;

import com.examly.springapp.model.AppliedCourse;

public interface AppliedCourseService {

	public AppliedCourse addAppliedCourse(AppliedCourse appliedCourse);

	public AppliedCourse updateAppliedCourse(AppliedCourse appliedCourse);

	public Set<AppliedCourse> getAppliedCourses();

	public AppliedCourse getAppliedCourse(Long applicationId);

	public void deleteAppliedCourse(Long applicationId);

}
