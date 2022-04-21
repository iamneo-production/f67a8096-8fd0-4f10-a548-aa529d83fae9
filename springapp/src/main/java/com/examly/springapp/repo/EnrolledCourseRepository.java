package com.examly.springapp.repo;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.examly.springapp.model.AppliedCourse;
import com.examly.springapp.model.Course;
import com.examly.springapp.model.EnrolledCourse;
import com.examly.springapp.model.Institute;
import com.examly.springapp.model.Student;
import com.examly.springapp.model.User;

public interface EnrolledCourseRepository extends JpaRepository<EnrolledCourse, Long> {

	public void save(AppliedCourse appliedCourse);

	public Set<EnrolledCourse> findByStudent(Student student);

	public Set<EnrolledCourse> findByUser(User user);

	public Object findByCourse(Course course);

	@Query(value = "select * from enrolledcourse s where s.user_id = :userId and s.course_id = :courseId", nativeQuery = true)
	public Object findByenrolledcourse(@Param("userId") long userId, @Param("courseId") long courseId);
}
