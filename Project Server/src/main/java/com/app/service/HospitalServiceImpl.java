package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.DoctorDao;
import com.app.dao.HospitalDao;
import com.app.pojos.Doctor;
import com.app.pojos.Hospital;
import com.app.pojos.HospitalState;

@Service
@Transactional
public class HospitalServiceImpl implements HospitalService {
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private HospitalDao hospitalDao;
	@Autowired
	private DoctorDao doctorDao;
	
	@Override
	public List<Hospital> getAllHopitals() {
		
		return hospitalDao.findAll();
	}
	
	@Override
	public List<Hospital> getAllByStatusActive() {
		
		return hospitalDao.findByStatus(HospitalState.ACTIVE);
	}
	
	@Override
	public List<Hospital> getAllByStatusInactive() {
		
		return hospitalDao.findByStatus(HospitalState.INACTIVE);
	}
	
	@Override
	public Hospital addNewHospital(Hospital hptl) {
		hptl.setStatus(HospitalState.ACTIVE);
		return hospitalDao.save(hptl);
	}
	
	@Override
	public Hospital getHopitalById(Long id) {
		
		return hospitalDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Patient id"));
	}
	
	@Override
	public Hospital login(String email,String pass) {
		
		return hospitalDao.findByEmailAndPassword(email, pass);
	}
	
	@Override
	public String deleteHospital(Long id) {
		hospitalDao.deleteById(id);
		return "Done";
	}
	
	@Override
	public Hospital update(Hospital hptl) {
//		if(hptl.getStatus().equals(HospitalState.INACTIVE)){
//			System.out.println("inactive");
//			List<Doctor> list=doctorDao.findByStatusAndHsptlID(HospitalState.INACTIVE,hptl.getID());
//			for (Doctor doctor : list) {
//				doctor.setStatus(HospitalState.INACTIVE);
//				doctorDao.save(doctor);
//			}
//		}
//		if(hptl.getStatus().equals(HospitalState.ACTIVE)){
//			System.out.println("active");
//			List<Doctor> list=doctorDao.findByStatusAndHsptlID(HospitalState.ACTIVE,hptl.getID());
//			for (Doctor doctor : list) {
//				doctor.setStatus(HospitalState.ACTIVE);
//				doctorDao.save(doctor);
//			}
//		}
		
		return hospitalDao.save(hptl);
	}
	
//	@Override
//	public String update(Long id) {
//		hospitalDao.deleteById(id);
//		return "Done";
//	}
	

}
