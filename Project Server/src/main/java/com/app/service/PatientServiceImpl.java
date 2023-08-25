package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.PatientDao;
import com.app.pojos.Hospital;
import com.app.pojos.Patient;

@Service
@Transactional
public class PatientServiceImpl implements PatientService {
	
	@Autowired
	private PatientDao patientDao;
	
	@Override
	public Patient addNewPatient(Patient p) {
		return patientDao.save(p);
	}
	
	@Override
	public Patient update(Patient p) {
		Patient patient=patientDao.findById(p.getID()).orElseThrow(() -> new ResourceNotFoundException("Invalid Doctor's id"));
		patient.setFirstName(p.getFirstName());
		patient.setLastName(p.getLastName());
		patient.setGendeer(p.getGendeer());
		patient.setEmail(p.getEmail());
		patient.setMobNumber(p.getMobNumber());
		patient.setPassword(p.getPassword());
		patient.setAddressLineOne(p.getAddressLineOne());
		patient.setAddressLineTwo(p.getAddressLineTwo());
		return patientDao.save(patient);
	}
	
	@Override
	public Patient getById(Long id) {
		return patientDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Doctor's id"));
	}
	
	@Override
	public Patient login(String email,String pass) {
		
		return patientDao.findByEmailAndPassword(email, pass);
	}
	

}
