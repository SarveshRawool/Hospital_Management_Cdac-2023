package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.pojos.Appointment;
import com.app.pojos.Doctor;
import com.app.pojos.StatusType;
import com.app.service.AppointmentService;

@RestController
@RequestMapping("/appointment")
@CrossOrigin(origins = "*")
public class AppointmentController {

	@Autowired 
	private AppointmentService appointmentService;
	
	@PostMapping("/{pID}/{dID}/{hID}")
	public ResponseEntity<?> addNewCourse(@RequestBody  Appointment a,@RequestParam Long pID,@RequestParam Long dID,@RequestParam Long hID){
		System.out.println("in response"+a);
		return ResponseEntity.status(HttpStatus.CREATED).body(appointmentService.takeAppointment(pID, dID, hID,a));
	}
	
	@GetMapping("/hospital/{hid}")
	public ResponseEntity<?> getAllAppointMentsByHospitalId(@RequestParam Long hID){
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAllAppointmentsByHospitalId(hID));
	}
	
	@GetMapping("/doctor/{did}")
	public ResponseEntity<?> getAllAppointMentsByDoctorId(@RequestParam Long dID){
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAllAppointmentsByDoctorId(dID));
	}
	
	@GetMapping("/patient/{did}")
	public ResponseEntity<?> getAllAppointMentsByPatientId(@RequestParam Long pID){
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAllAppointmentsByPatientId(pID));
	}
	//getAppointmentByAppointmentId
	@GetMapping("/single/{aId}")
	public ResponseEntity<?> getAppointmentByAppointmentId(@RequestParam Long aId){
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getAppointmentByAppointmentId(aId));
	}
	
	
	@GetMapping("/single/hospital/{hid}")
	public ResponseEntity<?> getHospitalByAppointmentId(@RequestParam Long hID){
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getHospitalByAppointmentId(hID));
	}
	
	@GetMapping("/single/doctor/{did}")
	public ResponseEntity<?> getDoctorByAppointmentId(@RequestParam Long dID){
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getDoctorByAppointmentId(dID));
	}
	
	@GetMapping("/single/patient/{did}")
	public ResponseEntity<?> getPatientByPatientId(@RequestParam Long pID){
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.getPatientByPatientId(pID));
	}
	
	@PutMapping("/cancel/{pid}")
	public ResponseEntity<?> updateByid(@RequestParam Long pid){
		Appointment appointment=appointmentService.getAppointmentByAppointmentId(pid);
		appointment.setStatus(StatusType.CANCELLED);
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.update(appointment));
	}
	
	@PutMapping("/done/{pid}")
	public ResponseEntity<?> updateByAid(@RequestParam Long pid){
		Appointment appointment=appointmentService.getAppointmentByAppointmentId(pid);
		appointment.setStatus(StatusType.DONE);
		return ResponseEntity.status(HttpStatus.OK).body(appointmentService.update(appointment));
	}
	
	
}
