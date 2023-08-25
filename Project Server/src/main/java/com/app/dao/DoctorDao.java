package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Doctor;
import com.app.pojos.HospitalState;

public interface DoctorDao extends JpaRepository<Doctor,Long> {
	List<Doctor> findByHsptlID(Long id);
	Doctor findByEmailAndPassword(String email,String Pass);
	Doctor findByAppointmentsID(Long id);
	List<Doctor> findByStatusAndHsptlID(HospitalState state,Long id);
	List<Doctor> findByStatus(HospitalState state);
	Doctor findByEmail(String email);
}
