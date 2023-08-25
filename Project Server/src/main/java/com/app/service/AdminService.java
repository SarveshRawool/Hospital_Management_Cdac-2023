package com.app.service;

import com.app.pojos.Admin;

public interface AdminService {

	Admin addNewDoctor(Admin admin);

	Admin login(String email, String pass);

}
