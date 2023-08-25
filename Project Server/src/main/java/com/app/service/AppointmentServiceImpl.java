package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AppointmentDao;
import com.app.dao.DoctorDao;
import com.app.dao.HospitalDao;
import com.app.dao.PatientDao;
import com.app.pojos.Appointment;
import com.app.pojos.Doctor;
import com.app.pojos.Hospital;
import com.app.pojos.Patient;

@Service
@Transactional
public class AppointmentServiceImpl implements AppointmentService {
	
	@Autowired
	private AppointmentDao appointmentDao;
	@Autowired 
	private PatientDao patientDao;
	@Autowired
	private DoctorDao doctorDao;
	@Autowired
	private HospitalDao hospitalDao;
	
	@Override
	public Appointment takeAppointment(Long empID, Long DocID,Long hID, Appointment a) {
		Patient p=patientDao.findById(empID).orElseThrow(() -> new ResourceNotFoundException("Invalid Patient id"));
		p.addAppointment(a);
		Doctor d=doctorDao.findById(DocID).orElseThrow(() -> new ResourceNotFoundException("Invalid Doctor id"));
		d.addAppointment(a);
		Hospital h=hospitalDao.findById(hID).orElseThrow(() -> new ResourceNotFoundException("Invalid Hospital id"));
		h.addAppointment(a);
		
		a.setDoctorName(d.getFirstName()+" "+d.getLastName());
		a.setHospitalName(h.getHospitalName());
		a.setHospitalAddress(h.getAddressLineOne()+" "+h.getAddressLineTwo());
		a.setPatientName(p.getFirstName()+" "+p.getLastName());
		return appointmentDao.save(a);
	}

	@Override
	public List<Appointment> getAllAppointmentsByHospitalId(Long id) {
		return appointmentDao.findByHospitalID(id);
	}
	
	@Override
	public Appointment getAppointmentByAppointmentId(Long id) {
		return appointmentDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Appointment id"));
	}
	
	@Override
	public List<Appointment> getAllAppointmentsByDoctorId(Long id) {
		return appointmentDao.findByDoctorID(id);
	}
	
	@Override
	public List<Appointment> getAllAppointmentsByPatientId(Long id) {
		return appointmentDao.findByPatientID(id);
	}
	
	@Override
	public Hospital getHospitalByAppointmentId(Long id) {
		return hospitalDao.findByAppointmentsID(id);
	}
	
	@Override
	public Doctor getDoctorByAppointmentId(Long id) {
		return doctorDao.findByAppointmentsID(id);
	}
	
	@Override
	public Patient getPatientByPatientId(Long id) {
		return patientDao.findByAppointmentsID(id);
	}
	
	
	
	@Override
	public Appointment update(Appointment appointment) {
		return appointmentDao.save(appointment);
	}
	

}
