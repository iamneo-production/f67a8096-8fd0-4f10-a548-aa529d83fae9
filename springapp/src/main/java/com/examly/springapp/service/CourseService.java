package com.examly.springapp.service;

import java.util.Set;

import com.examly.springapp.model.Course;
import com.examly.springapp.model.Institute;

public interface CourseService {

	public Course addCourse(Course course);

	public Course updateCourse(Course course);

	public Set<Course> getCourses();

	public Course getCourse(Long courseId);

	public void deleteCourse(Long courseId);

	public Set<Course> getCoursesOfInstitute(Institute institute);

	public Set<Course> getByKeyword(String keyword);

	public Set<Course> searchAcademyCourseByKeyword(int insId, String keyword);

	public Set<Course> searchUserEnrolledCourseByKeyword(long userId, String keyword);
}