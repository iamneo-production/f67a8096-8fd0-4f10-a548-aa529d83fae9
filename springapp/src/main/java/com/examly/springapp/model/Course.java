package com.examly.springapp.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Course {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long courseId;
	
	private String courseName;
	private String courseDesc;
	private String courseDuration;
	private String courseCost;
	private String courseTimings;
	public String getCourseTimings() {
		return courseTimings;
	}
	public void setCourseTimings(String courseTimings) {
		this.courseTimings = courseTimings;
	}
	public Set<EnrolledCourse> getEnrolledCourse() {
		return enrolledCourse;
	}
	public void setEnrolledCourse(Set<EnrolledCourse> enrolledCourse) {
		this.enrolledCourse = enrolledCourse;
	}

	private float rating;
	
	@CreationTimestamp
    private LocalDateTime CreatedAt;
    @UpdateTimestamp
    private LocalDateTime UpdatedAt;
    	
	@JoinColumn(name = "createdByID")
	@ManyToOne(fetch = FetchType.EAGER)
	private User user;
	
	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
	@JsonIgnore
    private Set<AppliedCourse> appliedCourse= new HashSet<>();
	
	@OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
	@JsonIgnore
    private Set<EnrolledCourse> enrolledCourse= new HashSet<>();
	
	@JoinColumn(name = "instituteId")
	@ManyToOne(fetch = FetchType.EAGER)
    private Institute institute;

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

	public Set<AppliedCourse> getAppliedCourse() {
		return appliedCourse;
	}
	public void setAppliedCourse(Set<AppliedCourse> appliedCourse) {
		this.appliedCourse = appliedCourse;
	}

	public Long getCourseId() {
		return courseId;
	}

	public void setCourseId(Long courseId) {
		this.courseId = courseId;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCourseDesc() {
		return courseDesc;
	}

	public void setCourseDesc(String courseDesc) {
		this.courseDesc = courseDesc;
	}

	public String getCourseDuration() {
		return courseDuration;
	}

	public void setCourseDuration(String courseDuration) {
		this.courseDuration = courseDuration;
	}

	public String getCourseCost() {
		return courseCost;
	}

	public void setCourseCost(String courseCost) {
		this.courseCost = courseCost;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public Institute getInstitute() {
		return institute;
	}

	public void setInstitute(Institute institute) {
		this.institute = institute;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}