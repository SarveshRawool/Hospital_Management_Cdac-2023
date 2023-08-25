package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Admin;
import com.app.pojos.Doctor;

public interface AdminDao extends JpaRepository<Admin,Long>{
	Admin findByEmail(String email);
	Admin findByEmailAndPassword(String email,String password);
}
