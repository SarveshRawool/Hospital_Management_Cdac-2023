package com.app.service;

import java.io.IOException;
import java.util.List;

import org.apache.catalina.connector.Response;

import com.app.dto.AddDoctor;
import com.app.dto.DoctorResponse;
import com.app.dto.SignInResponse;
import com.app.pojos.Doctor;
import com.app.pojos.Hospital;

public interface DoctorService {
	public List<Doctor> getAllDoctorsByHospitalId(Long id);
	Doctor getById(Long dId);
	Doctor updateDoctor(Doctor doctor);
	Doctor login(String email, String pass);
	String deleteDoctor(Long id);
	SignInResponse getHospitalByDoctorId(Long dId);
	List<Doctor> getAllDoctors();
	Doctor addNewDoctor(Long id, AddDoctor addDoctor) ;
	List<Doctor> getAllByStatusActive(Long id);
	List<Doctor> getAllByStatusInactive(Long Id);
}
