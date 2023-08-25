package com.app.service;

import javax.transaction.Transactional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.ScheduleDao;
import com.app.pojos.Hospital;
import com.app.pojos.WorkingHours;

@Service
@Transactional
public class ScheduleServiceImpl implements ScheduleService {
	@Autowired
	private ModelMapper mapper;
	@Autowired
	private ScheduleDao scheduleDao;
	
	@Override
	public WorkingHours getShceduleById(Long id) {
		
		return scheduleDao.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid Doctor's id"));
	}
	
	@Override
	public WorkingHours setShcedule(WorkingHours workingHours) {
		
		return scheduleDao.save(workingHours);
	}
	
}
