package com.examly.springapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.model.AppliedCourse;
import com.examly.springapp.model.Course;
import com.examly.springapp.model.Student;

public interface AppliedCourseRepository extends JpaRepository<AppliedCourse,Long> {

	public AppliedCourse findByCourse(Course course);

	public Object findByStudent(Student student);
	
	@Query(value = "select * from appliedcourse s where s.student_id = :studentId and s.course_id = :courseId", nativeQuery = true)
	public Object findByappliedcourse(@Param("studentId") long studentId, @Param("courseId") long courseId);
}
