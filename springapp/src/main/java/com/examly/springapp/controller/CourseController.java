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

import com.examly.springapp.model.Course;
import com.examly.springapp.model.Institute;
import com.examly.springapp.model.Student;
import com.examly.springapp.service.CourseService;

@RestController
@CrossOrigin("*")
@RequestMapping("/course")
public class CourseController {
	@Autowired
	private CourseService courseService;

	@PostMapping("/addCourse")
	public Course add(@RequestBody Course course) {
		return this.courseService.addCourse(course);
	}

	@PutMapping("/editCourse")
	public Course update(@RequestBody Course course) {
		return this.courseService.updateCourse(course);
	}

	@GetMapping("/viewCourse")
	public Set<Course> courses() {
		return this.courseService.getCourses();
	}

	@GetMapping("/{courseId}")
	public Course course(@PathVariable("courseId") Long courseId) {
		return this.courseService.getCourse(courseId);
	}

	@DeleteMapping("/deleteCourse/{courseId}")
	public void deleteCourse(@PathVariable("courseId") Long courseId) {
		this.courseService.deleteCourse(courseId);
	}

	@GetMapping("/search/{keyword}")
	public Set<Course> search(@PathVariable(value = "keyword", required = false) String keyword, Student student,
			Model model) {
		if (keyword.length() > 0) {
			Set<Course> list = courseService.getByKeyword(keyword);
			return list;
		} else {
			Set<Course> list = courseService.getCourses();
			return list;
		}
	}

	@GetMapping("/institute/{instituteId}")
	public Set<Course> getCoursesOfInstitute(@PathVariable("instituteId") Long instituteId) {
		Institute institute = new Institute();
		institute.setInstituteId(instituteId);
		Set<Course> coursesOfInstitute = this.courseService.getCoursesOfInstitute(institute);
		return coursesOfInstitute;

	}

	@GetMapping("/institute/{instituteId}/search/{keyword}")
	public Set<Course> searchCourse(
			@PathVariable(value = "instituteId") int insId,
			@PathVariable(value = "keyword", required = false) String keyword,
			Student student,
			Model model) {
		if (keyword.length() > 0) {
			Set<Course> list = courseService.searchAcademyCourseByKeyword(insId, keyword);
			return list;
		} else {
			Set<Course> list = courseService.getCourses();
			return list;
		}
	}

	@GetMapping("/searchUserEnrolledCourse/userId/{userId}/search/{keyword}")
	public Set<Course> searchEnrolledUserCourses(
			@PathVariable("userId") long userId,
			@PathVariable("keyword") String keyword) {
		return this.courseService.searchUserEnrolledCourseByKeyword(userId, keyword);
	}

}