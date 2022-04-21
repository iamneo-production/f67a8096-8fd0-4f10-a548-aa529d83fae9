package com.examly.springapp.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.model.Course;
import com.examly.springapp.model.Institute;

public interface CourseRepository extends JpaRepository<Course, Long> {

	Set<Course> findByInstitute(Institute institute);

	public Course findByCourseName(String courseName);

	@Query(value = "select * from course s "
			+ "where s.course_name like %:keyword% or s.course_duration like %:keyword%"
			+ " or s.course_cost like %:keyword% or s.course_desc like %:keyword% ", nativeQuery = true)
	public Set<Course> findByKeyword(@Param("keyword") String keyword);

	@Query(value = "select * from course s "
			+ "where s.institute_id = :insId "
			+ "and (s.course_name like %:keyword% or s.course_duration like %:keyword% "
			+ "or s.course_cost like %:keyword% or s.course_desc like %:keyword%)", nativeQuery = true)
	public Set<Course> findByKeywordAcademyCourse(@Param("insId") int insId, @Param("keyword") String keyword);

	@Query(value = "  select * from course as c "
			+ "where 1 <= ( "
			+ "select count(e.user_id) from enrolledcourse as e "
			+ "where e.course_id  = c.course_id "
			+ "and e.user_id = :userId "
			+ "and (c.course_name like %:keyword% "
			+ "or c.course_duration like %:keyword% "
			+ "or c.course_cost like %:keyword% "
			+ "or c.course_desc like %:keyword% )) ", nativeQuery = true)
	public Set<Course> findByKeywordUserEnrolledCourse(@Param("userId") long userId, @Param("keyword") String keyword);
}