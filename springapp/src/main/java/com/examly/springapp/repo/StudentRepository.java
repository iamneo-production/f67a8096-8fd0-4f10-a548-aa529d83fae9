package com.examly.springapp.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD:src/main/java/com/examly/springapp/repo/StudentRepository.java
import com.examly.springapp.model.Student;
import com.examly.springapp.model.User;
=======
import java.util.List;

import com.springboot.demo.model.Student;
import com.springboot.demo.model.User;
>>>>>>> 41ec4664354f3aa14db9b096ce222db4f8f5d591:src/main/java/com/springboot/demo/repo/StudentRepository.java

public interface StudentRepository extends JpaRepository<Student, Long> {

	public Student findByStudentEmail(String studentEmail);

	@Query(value = "select "
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
			+ "e.student_id = s.student_id and "
			+ "e.course_id = c.course_id and ( "
			+ "s.student_id like %:keyword% or c.course_id like %:keyword% or s.first_name like %:keyword% or "
			+ "s.last_name like %:keyword% or "
			+ "s.mobile_number like %:keyword% or c.course_name like %:keyword%)", nativeQuery = true)
	public List<Object> findByKeyword(@Param("keyword") String keyword);

	public Set<Student> findByUser(User user);

}
