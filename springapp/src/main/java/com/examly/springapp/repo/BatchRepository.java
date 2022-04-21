package com.examly.springapp.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.examly.springapp.model.Batch;

public interface BatchRepository extends JpaRepository<Batch,Long> {

}
