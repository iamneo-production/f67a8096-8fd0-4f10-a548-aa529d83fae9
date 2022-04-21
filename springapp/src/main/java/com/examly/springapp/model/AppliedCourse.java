package com.examly.springapp.model;

import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


@Entity
@Table(name="appliedcourse")
public class AppliedCourse {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private long applicationId;
	@CreationTimestamp
	private LocalDateTime applicationDate;
	private String applicationStatus;
	
	@CreationTimestamp
    private LocalDateTime CreatedAt;
    @UpdateTimestamp
    private LocalDateTime UpdatedAt;
    
    @JoinColumn(name = "studentId")
	@ManyToOne(fetch = FetchType.EAGER)
    private Student student;
    
    @JoinColumn(name = "courseId")
	@ManyToOne(fetch = FetchType.EAGER)
    private Course course;
    
    @JoinColumn(name = "userId")
	@ManyToOne(fetch = FetchType.EAGER)
    private User user;

	public long getApplicationId() {
		return applicationId;
	}

	public void setApplicationId(long applicationId) {
		this.applicationId = applicationId;
	}

	public LocalDateTime getApplicationDate() {
		return applicationDate;
	}

	public void setApplicationDate(LocalDateTime applicationDate) {
		this.applicationDate = applicationDate;
	}

	public String getApplicationStatus() {
		return applicationStatus;
	}

	public void setApplicationStatus(String applicationStatus) {
		this.applicationStatus = applicationStatus;
	}

	public LocalDateTime getCreatedAt() {
		return CreatedAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		CreatedAt = createdAt;
	}

	public LocalDateTime getUpdatedAt() {
		return UpdatedAt;
	}

	public void setUpdatedAt(LocalDateTime updatedAt) {
		UpdatedAt = updatedAt;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	public Course getCourse() {
		return course;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public void setCourse(Course course) {
		this.course = course;
	}
}
