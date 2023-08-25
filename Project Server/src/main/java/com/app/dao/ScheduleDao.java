package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.WorkingHours;

public interface ScheduleDao extends JpaRepository<WorkingHours, Long> {

}
