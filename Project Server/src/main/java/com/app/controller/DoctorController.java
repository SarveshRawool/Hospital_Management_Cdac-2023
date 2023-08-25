package com.app.controller;

import static org.springframework.http.MediaType.IMAGE_GIF_VALUE;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;
import static org.springframework.http.MediaType.IMAGE_PNG_VALUE;

import java.io.IOException;

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
import org.springframework.web.multipart.MultipartFile;

import com.app.dao.DoctorDao;
import com.app.dao.HospitalDao;
import com.app.dto.AddDoctor;
import com.app.pojos.Doctor;
import com.app.pojos.Hospital;
import com.app.pojos.HospitalState;
import com.app.service.DoctorService;
import com.app.service.ImageHandlingService;

@RestController
@RequestMapping("/doctor")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class DoctorController {
	@Autowired
	private DoctorService doctorService;
	@Autowired
	private ImageHandlingService imgService;
	
	@GetMapping("/status/active/{hId}")
	public ResponseEntity<?> getAllDoctorsByStatusActive(@RequestParam Long hId){
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getAllByStatusActive(hId));
	}
	@GetMapping("/status/inactive/{hId}")
	public ResponseEntity<?> getAllDoctorsByStatusInactive(@RequestParam Long hId){
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getAllByStatusInactive(hId));
	}
	
	@GetMapping("/getall")
	public ResponseEntity<?> getAllDoctors(){
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getAllDoctors());
	}
	
	@GetMapping("/{did}")
	public ResponseEntity<?> getDoctorsById(@RequestParam Long hID){
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getById(hID));
	}
	
	@GetMapping("/hospital/{hid}")
	public ResponseEntity<?> getAllDoctorsByHospitalId(@RequestParam Long hID){
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getAllDoctorsByHospitalId(hID));
	}
	
	@GetMapping("/hospitalBy/id/{did}")
	public ResponseEntity<?> getHospitalByDoctorId(@RequestParam Long hID){
		return ResponseEntity.status(HttpStatus.OK).body(doctorService.getHospitalByDoctorId(hID));
	}
	
	@PostMapping("/{hsptlID}")
	public ResponseEntity<?> addNewDoctor(@RequestBody  AddDoctor addDoctor,@RequestParam Long hsptlID){
		System.out.println("in response"+addDoctor);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.addNewDoctor(hsptlID, addDoctor));
	}
	
	
	@PutMapping
	public ResponseEntity<?> updateDoctor(@RequestBody  Doctor doctor){
		System.out.println("in response"+doctor);
		doctor.setStatus(HospitalState.ACTIVE);
		return ResponseEntity.status(HttpStatus.CREATED).body(doctorService.updateDoctor(doctor));
	}
	
	@PostMapping(value = "/images/{empId}", consumes = "multipart/form-data", headers = "Content-Type= multipart/form-data")
	public ResponseEntity<?> uploadImage(@PathVariable Long empId, @RequestParam MultipartFile imageFile)
			throws IOException {
		System.out.println("in upload img " + empId);
		return ResponseEntity.status(HttpStatus.CREATED).body(imgService.uploadDoctorsImage(empId, imageFile));
	}
	
	@GetMapping(value="/images/{empId}",produces = {IMAGE_GIF_VALUE,IMAGE_JPEG_VALUE,IMAGE_PNG_VALUE})
	public ResponseEntity<?> serveEmpImage(@PathVariable Long empId) throws IOException {
		System.out.println("in download img " + empId);
		return ResponseEntity.ok(imgService.downloadDoctorsImage(empId));
	}
	
	
	@PutMapping("/status/inactive/{dId}")
	public ResponseEntity<?> updateDoctorStatus(@RequestParam Long dId){
		//Hospital hospital=hospitalService.getHopitalById(hId);
		Doctor doctor=doctorService.getById(dId);
		doctor.setStatus(HospitalState.INACTIVE);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(doctorService.updateDoctor(doctor));
	
	}
	@PutMapping("/status/active/{dId}")
	public ResponseEntity<?> updateDoctorStatusActive(@RequestParam Long dId){
		//Hospital hospital=hospitalService.getHopitalById(hId);
				Doctor doctor=doctorService.getById(dId);
				doctor.setStatus(HospitalState.ACTIVE);
				return ResponseEntity.status(HttpStatus.ACCEPTED).body(doctorService.updateDoctor(doctor));
	
	}
}
