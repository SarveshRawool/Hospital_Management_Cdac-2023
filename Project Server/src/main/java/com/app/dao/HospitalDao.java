package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.app.pojos.Hospital;
import com.app.pojos.HospitalState;

public interface HospitalDao extends JpaRepository<Hospital,Long> {
	Hospital findByEmailAndPassword(String email,String Pass);
	Hospital findByDoctorsID(Long id);
	Hospital findByAppointmentsID(Long id);
	List<Hospital> findByStatus(HospitalState state);
	Hospital findByEmail(String email);
	
//	@Query(value = "UPDATE Hospital set", nativeQuery = true)
//    @Modifying
//	void updateHospital(Hospital hospital);
	
}
