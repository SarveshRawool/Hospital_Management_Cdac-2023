package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AdminDao;
import com.app.dto.AddDoctor;
import com.app.pojos.Admin;
import com.app.pojos.Doctor;
import com.app.pojos.Hospital;
import com.app.pojos.Patient;

@Service
@Transactional
public class AdminSarviceImpl implements AdminService {
	@Autowired
	private AdminDao adminDao;
	
	@Override
	public Admin addNewDoctor(Admin admin) {
		return adminDao.save(admin);
	}
	@Override
	public Admin login(String email,String pass) {
		
		return adminDao.findByEmailAndPassword(email, pass);
	}
}
