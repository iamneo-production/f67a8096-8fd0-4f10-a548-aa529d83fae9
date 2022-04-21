package com.examly.springapp.service;

import java.util.Set;

import com.examly.springapp.model.Batch;

public interface BatchService {

	public Batch addBatch(Batch batch);


	public Set<Batch> findAll();


	public Batch filterBatch(long batchId);


	public Batch updateBatch(Batch batch);


	void deleteBatch(Long batchId);


}
