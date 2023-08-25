package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.pojos.Reciept;

public interface RecieptDao extends JpaRepository<Reciept, Long> {
	Reciept findByAppointmentID(Long ID);
}
