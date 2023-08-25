package com.app.service;

import java.io.IOException;
import java.util.List;

import javax.transaction.Transactional;

import org.apache.catalina.connector.Response;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.DoctorDao;
import com.app.dao.HospitalDao;
import com.app.dto.AddDoctor;
import com.app.dto.ApiResponse;
import com.app.dto.DoctorResponse;
import com.app.dto.SignInResponse;
import com.app.pojos.Appointment;
import com.app.pojos.Doctor;
import com.app.pojos.Hospital;
import com.app.pojos.HospitalState;

@Service
@Transactional
public class DoctorServiceImpl implements DoctorService {
	@Autowired
	private DoctorDao doctorDao;
	@Autowired
	private HospitalDao hospitalDao;
	@Autowired
	private ImageHandlingService imgService;
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public List<Doctor> getAllDoctors() {
		return doctorDao.findAll();
	}
	
	@Override
	public List<Doctor> getAllByStatusActive(Long id) {
		
		return doctorDao.findByStatusAndHsptlID(HospitalState.ACTIVE,id);
	}
	
	@Override
	public List<Doctor> getAllByStatusInactive(Long id) {
		
		return doctorDao.findByStatusAndHsptlID(HospitalState.INACTIVE,id);
	}
	
	@Override
	public Doctor getById(Long dId) {
		Doctor doctor=doctorDao.findById(dId).orElseThrow(() -> new ResourceNotFoundException("Invalid Doctor's id"));
		DoctorResponse response=mapper.map(doctor, DoctorResponse.class);
		return doctor;
	}
	
	@Override
	public SignInResponse getHospitalByDoctorId(Long dId) {
		Hospital hospital=hospitalDao.findByDoctorsID(dId);
		SignInResponse response=new SignInResponse();
		response.setId(hospital.getID());
		response.setName(hospital.getHospitalName());
		return response;
	}

	@Override
	public Doctor addNewDoctor(Long id,AddDoctor addDoctor) {
		Hospital hsptl= hospitalDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Hospital id"));
		
		Doctor doctor=mapper.map(addDoctor, Doctor.class);
		doctor.setStatus(HospitalState.ACTIVE);
		hsptl.addDoctor(doctor);
		Doctor doctor2= doctorDao.save(doctor);
		//imgService.uploadDoctorsImage(doctor2.getID(), addDoctor.getImageFile());
		return doctor2;
	}
	
	@Override
	public List<Doctor> getAllDoctorsByHospitalId(Long id) {
//		return doctorDao.findByHsptlID(id);
		return doctorDao.findByStatusAndHsptlID(HospitalState.ACTIVE,id);
	}
	
	@Override
	public Doctor updateDoctor(Doctor doctor) {
		Doctor doctor2=doctorDao.findById(doctor.getID()).orElseThrow(() -> new ResourceNotFoundException("Invalid Hospital id"));
		doctor2.setFirstName(doctor.getFirstName());
		doctor2.setLastName(doctor.getLastName());
		doctor2.setGendeer(doctor.getGendeer());
		doctor2.setEmail(doctor.getEmail());
		doctor2.setMobNumber(doctor.getMobNumber());
		doctor2.setPassword(doctor.getPassword());
		doctor2.setAddressLineOne(doctor.getAddressLineOne());
		doctor2.setAddressLineTwo(doctor.getAddressLineTwo());
		doctor2.setExperience(doctor.getExperience());
		doctor2.setSpeciality(doctor.getSpeciality());
		doctor2.setStatus(doctor.getStatus());
		return doctorDao.save(doctor2);
	}
	
	@Override
	public Doctor login(String email,String pass) {
		
		return doctorDao.findByEmailAndPassword(email, pass);
	}
	
	@Override
	public String deleteDoctor(Long id) {
		doctorDao.deleteById(id);
		return "Done";
	}

}
