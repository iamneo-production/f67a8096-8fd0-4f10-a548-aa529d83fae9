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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="institute")
public class Institute {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long instituteId;
	private String instituteName;
	private String instituteDesc;
	private String state;
	private String city;
	private String instituteAddress;
	private String instituteMobile;
	private String instituteEmail;
	private String imageURL;
	public String getImageURL() {
		return imageURL;
	}
	public void setImageURL(String imageURL) {
		this.imageURL = imageURL;
	}

	private float rating;
	
	@CreationTimestamp
    private LocalDateTime CreatedAt;
    @UpdateTimestamp
    private LocalDateTime UpdatedAt;
    
    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @OneToMany(mappedBy = "institute", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<Course> course = new HashSet<>();

    
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
	
	public Long getInstituteId() {
		return instituteId;
	}

	public void setInstituteId(Long instituteId) {
		this.instituteId = instituteId;
	}

	public String getInstituteName() {
		return instituteName;
	}

	public void setInstituteName(String instituteName) {
		this.instituteName = instituteName;
	}

	public String getInstituteDesc() {
		return instituteDesc;
	}

	public void setInstituteDesc(String instituteDesc) {
		this.instituteDesc = instituteDesc;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getInstituteAddress() {
		return instituteAddress;
	}

	public void setInstituteAddress(String instituteAddress) {
		this.instituteAddress = instituteAddress;
	}

	public String getInstituteMobile() {
		return instituteMobile;
	}

	public void setInstituteMobile(String instituteMobile) {
		this.instituteMobile = instituteMobile;
	}

	public String getInstituteEmail() {
		return instituteEmail;
	}

	public void setInstituteEmail(String instituteEmail) {
		this.instituteEmail = instituteEmail;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Set<Course> getCourse() {
		return course;
	}

	public void setCourse(Set<Course> course) {
		this.course = course;
	}

	
	
}
