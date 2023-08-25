package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AddDoctor;
import com.app.pojos.Admin;
import com.app.service.AdminService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "*")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	@PostMapping
	public ResponseEntity<?> addNewDoctor(@RequestBody  Admin admin ){
		System.out.println("in response"+admin);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(adminService.addNewDoctor(admin));
	}
}
