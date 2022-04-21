package com.examly.springapp.service.impl;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.exception.ResourceFoundException;
import com.examly.springapp.exception.ResourceNotFoundException;
import com.examly.springapp.model.EnrolledCourse;
import com.examly.springapp.model.Student;
import com.examly.springapp.model.User;
import com.examly.springapp.repo.EnrolledCourseRepository;
import com.examly.springapp.repo.StudentRepository;
import com.examly.springapp.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService{
	
	@Autowired
	private StudentRepository studentRepository;
	@Autowired 
	EnrolledCourseRepository enrolledCourseRepository;
	
	@Override
	public Student addStudent(Student student) {
		Student local=this.studentRepository.findByStudentEmail(student.getStudentEmail());
		//System.out.print(local.getStudentId()+"hello");
		if(local!=null) throw new ResourceFoundException("Student Already Present !!  ",local.getStudentId());
		return this.studentRepository.save(student);
	}
	@Override
	public Student getStudent(long id) {
		this.studentRepository.findById(id)
		.orElseThrow(()->new ResourceNotFoundException("Student not found for id : "+id));
		return this.studentRepository.findById(id).get();
	}
	@Override
	public Student updateStudent(Student student) {
		this.studentRepository.findById(student.getStudentId())
		.orElseThrow(()->new ResourceNotFoundException("Student not found to update in this id : "+student.getStudentId()));
		Student s1=studentRepository.findById(student.getStudentId()).get();
		student.setCreatedAt(s1.getCreatedAt());
		return this.studentRepository.save(student);
	}
	@Override
	public Set<Student> getStudents(){
		return new LinkedHashSet<>(this.studentRepository.findAll());
	}
	@Override
	public void deleteStudent(Long studentId) {
		// TODO Auto-generated method stub
		Student student=this.studentRepository.findById(studentId)
				.orElseThrow(()->new ResourceNotFoundException("Student not found for id : "+studentId));
		this.studentRepository.delete(student);

//		Institute institute=new Institute();
//		institute.setInstituteId(instituteId);
//		this.instituteRepository.delete(institute);
	}
	
	@Override
	public Set<Student> getStudentsofUser(User user) {
		// TODO Auto-generated method stub
		
		Set<Student> st=this.studentRepository.findByUser(user);
		//Student student=new Student();
		//student.setId(id);
		//return enrolledCourseRepository.findByStudent(Student);
		return st;
		
	}
	@Override
	public List<Object> getByKeyword(String keyword) {
		// TODO Auto-generated method stub
		return this.studentRepository.findByKeyword(keyword);
	}
	
	
}
