package com.app.controller;

import java.io.IOException;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;
import com.app.pojos.Hospital;
import com.app.pojos.HospitalState;
import com.app.service.DoctorService;
import com.app.service.HospitalService;
import com.app.service.ImageHandlingService;

import static org.springframework.http.MediaType.*;

@RestController
@RequestMapping("/hospital")
@CrossOrigin(origins = "*")
public class HospitalController {
	@Autowired
	private HospitalService hospitalService;
	@Autowired
	private ImageHandlingService imgService;
	@Autowired
	private DoctorService doctorService;
	
	@GetMapping
	public ResponseEntity<?> getAllHospital(){
		return ResponseEntity.status(HttpStatus.OK).body(hospitalService.getAllHopitals());
	}
	
	@GetMapping("/status/active")
	public ResponseEntity<?> getAllHospitalByStatusActive(){
		return ResponseEntity.status(HttpStatus.OK).body(hospitalService.getAllByStatusActive());
	}
	@GetMapping("/status/inactive")
	public ResponseEntity<?> getAllHospitalByStatusInactive(){
		return ResponseEntity.status(HttpStatus.OK).body(hospitalService.getAllByStatusInactive());
	}
	
	@GetMapping("/ById")
	public ResponseEntity<?> getHopitalById(@RequestParam Long hID){
		return ResponseEntity.status(HttpStatus.OK).body(hospitalService.getHopitalById(hID));
	}
	
	@PostMapping
	public ResponseEntity<?> addNewHospital(@RequestBody @Valid Hospital hptl ){
		return ResponseEntity.status(HttpStatus.CREATED).body(hospitalService.addNewHospital(hptl));
	}
	
	@PutMapping
	public ResponseEntity<?> updateHospital(@RequestBody Hospital hptl){
		Hospital hospital=hospitalService.getHopitalById(hptl.getID());
		hospital.setHospitalName(hptl.getHospitalName());
		hospital.setHospitalInfo(hptl.getHospitalInfo());
		hospital.setAddressLineOne(hptl.getAddressLineOne());
		hospital.setAddressLineTwo(hptl.getAddressLineTwo());
		hospital.setEmail(hptl.getEmail());
		hospital.setMobNumber(hptl.getMobNumber());
		hospital.setPassword(hptl.getPassword());
		hospital.setWorkingDays(hptl.getWorkingDays());
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(hospitalService.addNewHospital(hospital));
	
	}
	
	@PutMapping("/status/inactine/{hId}")
	public ResponseEntity<?> updateHospitalStatus(@RequestParam Long hId){
		Hospital hospital=hospitalService.getHopitalById(hId);
		hospital.setStatus(HospitalState.INACTIVE);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(hospitalService.update(hospital));
	
	}
	@PutMapping("/status/actine/{hId}")
	public ResponseEntity<?> updateHospitalStatusActive(@RequestParam Long hId){
		Hospital hospital=hospitalService.getHopitalById(hId);
		hospital.setStatus(HospitalState.ACTIVE);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(hospitalService.update(hospital));
	
	}
	
	//, consumes = "multipart/form-data", headers = "Content-Type= multipart/form-data"
	
	@PostMapping(value = "/images/{empId}", consumes = "multipart/form-data")
	public ResponseEntity<?> uploadImage(@PathVariable Long empId, @RequestParam MultipartFile imageFile)
			throws IOException {
		System.out.println("in upload img " + empId);
		return ResponseEntity.status(HttpStatus.CREATED).body(imgService.uploadImage(empId, imageFile));
	}
	
	@GetMapping(value="/images/{empId}",produces = {IMAGE_GIF_VALUE,IMAGE_JPEG_VALUE,IMAGE_PNG_VALUE})
	public ResponseEntity<?> serveEmpImage(@PathVariable Long empId) throws IOException {
		System.out.println("in download img " + empId);
		return ResponseEntity.ok(imgService.downloadImage(empId));
	}
	
	@DeleteMapping("/{hId}")
	public ResponseEntity<?> deleteHospital(@PathVariable Long hId) throws IOException {
		System.out.println("in download img " + hId);
		ApiResponse apiResponse=new ApiResponse();
		apiResponse.setMessage(hospitalService.deleteHospital(hId));
		return ResponseEntity.ok(apiResponse);
	}
	
	
//	@GetMapping(value="/images",produces = {IMAGE_GIF_VALUE,IMAGE_JPEG_VALUE,IMAGE_PNG_VALUE})
//	public ResponseEntity<?> getAllImages() throws IOException{
//		return ResponseEntity.status(HttpStatus.OK).body(imgService.downloadAllImages());
//	}
}
