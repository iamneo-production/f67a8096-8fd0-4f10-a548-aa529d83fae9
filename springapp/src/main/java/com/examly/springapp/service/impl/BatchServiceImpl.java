package com.examly.springapp.service.impl;

import java.util.LinkedHashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.examly.springapp.model.Batch;
import com.examly.springapp.repo.BatchRepository;
import com.examly.springapp.service.BatchService;

@Service
public class BatchServiceImpl implements BatchService {

	@Autowired
	private BatchRepository batchRepository;
	
	@Override
	public Batch addBatch(Batch batch) {
		// TODO Auto-generated method stub
		return this.batchRepository.save(batch);
	}

	@Override
	public Set<Batch> findAll() {
		// TODO Auto-generated method stub
		return new LinkedHashSet<>(this.batchRepository.findAll());
	}

	@Override
	public Batch filterBatch(long batchId) {
		// TODO Auto-generated method stub
		return this.batchRepository.findById(batchId).get();
	}

	@Override
	public Batch updateBatch(Batch batch) {
		// TODO Auto-generated method stub
		Batch s1=batchRepository.findById(batch.getBatchId()).get();
		batch.setCreatedAt(s1.getCreatedAt());
		return this.batchRepository.save(batch);
	}

	@Override
	public void deleteBatch(Long batchId) {
		// TODO Auto-generated method stub
		Batch batch=new Batch();
		batch.setBatchId(batchId);
		this.batchRepository.delete(batch);
	}

}
