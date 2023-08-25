package com.app.service;

import java.util.List;

import com.app.pojos.Hospital;

public interface HospitalService {
	public List<Hospital> getAllHopitals();
	public Hospital addNewHospital(Hospital hptl);
	Hospital getHopitalById(Long id);
	Hospital login(String email, String pass);
	String deleteHospital(Long id);
	List<Hospital> getAllByStatusActive();
	List<Hospital> getAllByStatusInactive();
	Hospital update(Hospital hptl);
}
