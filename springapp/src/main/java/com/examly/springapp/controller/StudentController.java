package com.examly.springapp.controller;

import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

<<<<<<< HEAD:src/main/java/com/examly/springapp/controller/StudentController.java
import com.examly.springapp.model.Student;
import com.examly.springapp.service.StudentService;
=======
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
>>>>>>> 41ec4664354f3aa14db9b096ce222db4f8f5d591:src/main/java/com/springboot/demo/controller/StudentController.java

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/Student")
public class StudentController {
	@PersistenceContext
	private EntityManager entityManager;

	@Autowired
	private StudentService studentService;
	// get all students

	@GetMapping("/viewStudent")
	public Set<Student> getAllStudents() {
		return this.studentService.getStudents();
	}

	// create employee rest api
	@PostMapping("/addStudent")
	public Student addStudent(@RequestBody Student student) {
		Student student1 = this.studentService.addStudent(student);
		return student1;
	}

	// fetch by ID
	@GetMapping("/{studentId}")
	public Student filterStudent(@PathVariable("studentId") long studentId) {
		return this.studentService.getStudent(studentId);

	}

	// update by Id
	@PutMapping("/editStudent")
	public Student updateStudent(@RequestBody Student student) {
		return this.studentService.updateStudent(student);
	}

	// delete by id
	@DeleteMapping("/deleteStudent/{studentId}")
	public void deletestudent(@PathVariable("studentId") Long studentId) {
		this.studentService.deleteStudent(studentId);
	}

	@GetMapping("/search")
	public List<Object> search(@RequestParam String keyword) {
		if (keyword.length() > 0) {
			List<Object> list = studentService.getByKeyword(keyword);
			list.add(0,
					new Object[] { "userId", "courseId", "studentId", "firstName", "lastName", "mobileNumber",
							"enrolledCourseName" });
			return list;
		} else {
			return new ArrayList<Object>();
		}
	}

	@GetMapping("/adminStudentView")
	public List<?> allStudentView() {
		Query query = entityManager.createNativeQuery(
				"select "
						+ "e.user_id as user_id, "
						+ "e.course_id as course_id, "
						+ "e.student_id as student_id, "
						+ "s.first_name as first_name, "
						+ "s.last_name as last_name, "
						+ "s.mobile_number as mobile_number, "
						+ "c.course_name as enrolled_course_name "
						+ "from "
						+ "students as s, "
						+ "course as c, "
						+ "enrolledcourse as e "
						+ "where "
						+ "e.student_id = s.student_id "
						+ "and e.course_id = c.course_id ");

		List<Object> list = query.getResultList();

		list.add(0,
				new Object[] { "userId", "courseId", "studentId", "firstName", "lastName", "mobileNumber",
						"enrolledCourseName" });

		entityManager.clear();
		entityManager.close();

		return list;
	}
}