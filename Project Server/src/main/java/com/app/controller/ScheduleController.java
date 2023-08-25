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

import com.app.pojos.Patient;
import com.app.pojos.WorkingHours;
import com.app.service.ScheduleService;

@RestController
@RequestMapping("/schedule")
@CrossOrigin(origins = "*")
public class ScheduleController {
	@Autowired
	private ScheduleService scheduleService;
	
	@GetMapping
	public ResponseEntity<?> getScheduleById(@RequestParam Long id ){
		return ResponseEntity.status(HttpStatus.OK).body(scheduleService.getShceduleById(id));
	}
	
	@PostMapping
	public ResponseEntity<?> addSchedule(@RequestBody WorkingHours workingHours ){
		return ResponseEntity.status(HttpStatus.OK).body(scheduleService.setShcedule(workingHours));
	}
}
