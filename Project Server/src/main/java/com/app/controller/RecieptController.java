package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Doctor;
import com.app.pojos.Reciept;
import com.app.service.RecieptService;

@RestController
@RequestMapping("/appointment")
@CrossOrigin(origins = "*")
public class RecieptController {
	@Autowired
	private RecieptService recieptService;
	
	@PostMapping("/{AptID}")
	public ResponseEntity<?> addReciept(@RequestBody  Reciept reciept,@RequestParam Long AptID){
		System.out.println("in response"+reciept);
		return ResponseEntity.status(HttpStatus.CREATED).body(recieptService.setReciept(AptID, reciept));
	}
	
	@GetMapping("/{did}")
	public ResponseEntity<?> getRecieptById(@RequestParam Long did){
		return ResponseEntity.status(HttpStatus.OK).body(recieptService.getRecieptById(did));
	}
}
