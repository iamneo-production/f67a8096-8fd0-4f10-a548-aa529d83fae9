package com.examly.springapp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.examly.springapp.model.Batch;
import com.examly.springapp.service.BatchService;

@CrossOrigin("*")
@RestController
@RequestMapping("/batch")
public class BatchController {

	@Autowired
	private BatchService batchService;
	//get all batchs
	
	@GetMapping("/viewBatch")
	public ResponseEntity<?> getAllBatchs()
	{
		return ResponseEntity.ok(this.batchService.findAll());
	}
	
	//create employee rest api
	@PostMapping("/addBatch")
	public ResponseEntity<Batch> addBatch(@RequestBody Batch batch)
	{
		Batch batch1=this.batchService.addBatch(batch);
		 return ResponseEntity.ok(batch1);
	}
	
	//fetch by ID
	@GetMapping("/{batchId}")
	public Batch filterBatch(@PathVariable("batchId")long batchId)
	{
		return this.batchService.filterBatch(batchId);
		
	}
	
	//update by Id
	@PutMapping("/editBatch")
	public Batch updateBatch(@RequestBody Batch batch) {
		 return this.batchService.updateBatch(batch);
	 }
	
	//delete by id
	@DeleteMapping("/deleteBatch/{batchId}")
	 public void deleteBatch(@PathVariable("batchId")Long batchId) {
		this.batchService.deleteBatch(batchId);
	}
	
}
