package com.examly.springapp.service;

import java.util.Set;

import com.examly.springapp.model.Course;
import com.examly.springapp.model.EnrolledCourse;
import com.examly.springapp.model.Student;
import com.examly.springapp.model.User;

public interface EnrolledCourseService {

	public EnrolledCourse addEnrolledCourse(EnrolledCourse enrolledCourse);

	public EnrolledCourse updateEnrolledCourse(EnrolledCourse enrolledCourse);

	public Set<EnrolledCourse> getEnrolledCourses();

	public EnrolledCourse getEnrolledCourse(Long enrolledId);

	public void deleteEnrolledCourse(Long enrolledId);

	public Set<EnrolledCourse> getCourseofStudent(Student student);

	public Set<EnrolledCourse> getEnrolledCourseByUserId(User user);

	public Boolean checkStatus(long courseId, long studentId);
	
}
