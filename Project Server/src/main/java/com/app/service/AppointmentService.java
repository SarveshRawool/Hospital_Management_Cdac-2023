package com.app.service;

import java.util.List;

import com.app.pojos.Appointment;
import com.app.pojos.Doctor;
import com.app.pojos.Hospital;
import com.app.pojos.Patient;

public interface AppointmentService {
	public Appointment takeAppointment(Long empID,Long DocID,Long hid,Appointment a);
	public List<Appointment> getAllAppointmentsByHospitalId(Long id);
	List<Appointment> getAllAppointmentsByDoctorId(Long id);
	List<Appointment> getAllAppointmentsByPatientId(Long id);
	Appointment update(Appointment appointment);
	Appointment getAppointmentByAppointmentId(Long id);
	Hospital getHospitalByAppointmentId(Long id);
	Doctor getDoctorByAppointmentId(Long id);
	Patient getPatientByPatientId(Long id);
}
