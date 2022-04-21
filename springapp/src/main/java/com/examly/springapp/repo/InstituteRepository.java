package com.examly.springapp.repo;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.model.Institute;

public interface InstituteRepository extends JpaRepository<Institute,Long> {

	public Institute findByInstituteEmail(String instituteEmail);
	
	@Query(value = "select * from Institute s where s.institute_name like %:keyword% or s.state like %:keyword% or s.institute_address like %:keyword%", nativeQuery = true)
	 Set<Institute> findByKeyword(@Param("keyword") String keyword);

}
