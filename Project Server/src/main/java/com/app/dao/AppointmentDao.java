package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Appointment;
import com.app.pojos.Hospital;

public interface AppointmentDao extends JpaRepository<Appointment, Long> {
	List<Appointment> findByHospitalID(Long id);
	List<Appointment> findByDoctorID(Long id);
	List<Appointment> findByPatientID(Long id);
}
