package com.app.service;

import com.app.pojos.Hospital;
import com.app.pojos.Patient;

public interface PatientService {
	public Patient addNewPatient(Patient p);

	Patient login(String email, String pass);

	Patient getById(Long id);

	Patient update(Patient p);
}
