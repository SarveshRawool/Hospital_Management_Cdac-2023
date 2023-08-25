package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.AppointmentDao;
import com.app.dao.RecieptDao;
import com.app.pojos.Appointment;
import com.app.pojos.Reciept;
import com.app.pojos.StatusType;



@Service
@Transactional
public class RecieptServiceImpl implements RecieptService {
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private RecieptDao recieptDao;
	@Autowired
	private AppointmentDao appointmentDao;
	@Autowired
	private AppointmentService appointmentService;
	
	@Override
	public Reciept getRecieptById(Long id) {
		
		return recieptDao.findByAppointmentID(id);
	}
	
	@Override
	public Reciept setReciept(Long id,Reciept reciept) {
		Appointment appointment=appointmentDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Patient id"));
		appointment.setStatus(StatusType.DONE);
		appointmentService.update(appointment);
		reciept.setAppointment(appointment);
		return recieptDao.save(reciept);
	}
	
}
