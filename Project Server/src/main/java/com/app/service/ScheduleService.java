package com.app.service;

import com.app.pojos.Hospital;
import com.app.pojos.WorkingHours;

public interface ScheduleService {

	WorkingHours getShceduleById(Long id);

	WorkingHours setShcedule(WorkingHours workingHours);

}
