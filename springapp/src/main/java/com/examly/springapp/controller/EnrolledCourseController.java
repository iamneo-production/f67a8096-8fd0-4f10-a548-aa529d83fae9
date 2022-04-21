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

import com.examly.springapp.model.EnrolledCourse;
import com.examly.springapp.model.User;
import com.examly.springapp.service.EnrolledCourseService;

@RestController
@CrossOrigin("*")
@RequestMapping("/enrolledcourse")
public class EnrolledCourseController {

	@Autowired
	private EnrolledCourseService enrolledCourseService;

	@PostMapping("/addEnrolledCourse")
	public EnrolledCourse add(@RequestBody EnrolledCourse enrolledCourse) {
		return this.enrolledCourseService.addEnrolledCourse(enrolledCourse);
	}

	@PutMapping("/editEnrolledCourse")
	public EnrolledCourse update(@RequestBody EnrolledCourse enrolledCourse) {
		return this.enrolledCourseService.updateEnrolledCourse(enrolledCourse);
	}

	@GetMapping("/viewEnrolledCourse")
	public Set<EnrolledCourse> enrolledCourses() {
		return this.enrolledCourseService.getEnrolledCourses();
	}

	@GetMapping("/{EnrolledId}")
	public EnrolledCourse enrolledCourse(@PathVariable("enrolledId") Long enrolledId) {
		return this.enrolledCourseService.getEnrolledCourse(enrolledId);
	}

	@DeleteMapping("/deleteEnrolledCourse/{enrolledId}")
	public void deleteEnrolledCourse(@PathVariable("enrolledId") Long enrolledId) {
		this.enrolledCourseService.deleteEnrolledCourse(enrolledId);
	}

	@GetMapping("/enrolledCourses/{id}")
	public Set<EnrolledCourse> getenrolledCoursesById(@PathVariable("id") Long id) {
		User user = new User();
		user.setId(id);
		return this.enrolledCourseService.getEnrolledCourseByUserId(user);
	}

	@GetMapping("/enrolledCourses/{userId}/{courseId}")
	public Boolean checkStatus(@PathVariable("courseId") long courseId, @PathVariable("userId") long userId) {
		return this.enrolledCourseService.checkStatus(courseId, userId);
	}

}
