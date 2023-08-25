package com.app.spring_security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.app.dao.AdminDao;
import com.app.dao.DoctorDao;
import com.app.dao.HospitalDao;
import com.app.dao.PatientDao;
import com.app.pojos.Admin;
import com.app.pojos.Doctor;
import com.app.pojos.Hospital;
import com.app.pojos.Patient;
import com.app.service.DoctorService;
import com.app.service.HospitalService;
import com.app.service.PatientService;
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {

//	@Autowired
//	IUserDao userDao;
	
	@Autowired
	private DoctorDao doctorDao;
	
	@Autowired
	private HospitalDao hospitalDao;
	
	@Autowired
	private PatientDao patientDao;
	
	@Autowired
	private AdminDao adminDao;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
			//User user = userDao.findByEmail(email);
			
			Doctor doctor=doctorDao.findByEmail(email);
			if(doctor!=null)
			return doctor;
			
			Patient patient=patientDao.findByEmail(email);
			if(patient!=null)
			return patient;
			
			Hospital hospital=hospitalDao.findByEmail(email);
			if(hospital!=null)
				return hospital;
			
			Admin admin=adminDao.findByEmail(email);
			if(admin!=null)
				return admin;
			
//			if(user!=null) {
//				return user;
//			}
		
		return null;
	}

}
