package com.examly.springapp.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.examly.springapp.model.Student;
import com.examly.springapp.model.User;


public interface StudentRepository extends JpaRepository<Student,Long>{

	public Student findByStudentEmail(String studentEmail);

	@Query(value = "select * from Students s where s.city like %:keyword% or s.first_name like %:keyword%"
			+ " or s.last_name like %:keyword% or s.age like %:keyword% or s.gender like %:keyword% or s.father_name like %:keyword% "
			+ "or s.mother_name like %:keyword% or s.state like %:keyword%" , nativeQuery = true)
	 public Set<Student> findByKeyword(@Param("keyword") String keyword);

	public Set<Student> findByUser(User user);


}
