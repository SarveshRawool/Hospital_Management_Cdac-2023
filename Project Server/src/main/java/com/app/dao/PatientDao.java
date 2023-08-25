package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Patient;

public interface PatientDao extends JpaRepository<Patient, Long> {
	Patient findByEmailAndPassword(String email,String Pass);
	Patient findByAppointmentsID(Long id);
	Patient findByEmail(String email);
}
