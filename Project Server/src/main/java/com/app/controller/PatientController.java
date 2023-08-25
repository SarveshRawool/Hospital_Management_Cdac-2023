package com.app.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Hospital;
import com.app.pojos.Patient;
import com.app.service.PatientService;

@RestController
@RequestMapping("/patient")
@CrossOrigin(origins = "*")
public class PatientController {
	@Autowired
	private PatientService patientService;
	
	@PostMapping
	public ResponseEntity<?> addNewPatient(@RequestBody Patient p ){
		return ResponseEntity.status(HttpStatus.OK).body(patientService.addNewPatient(p));
	}
	
	@PutMapping
	public ResponseEntity<?> updatePatient(@RequestBody Patient p ){
		return ResponseEntity.status(HttpStatus.OK).body(patientService.update(p));
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getPatientById(@RequestParam Long id ){
		return ResponseEntity.status(HttpStatus.OK).body(patientService.getById(id));
	}

	
}
