package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.SignInResponse;
import com.app.jwt.JWTUtility;
import com.app.pojos.Admin;
import com.app.pojos.Doctor;
import com.app.pojos.Hospital;
import com.app.pojos.Patient;
import com.app.service.AdminService;
import com.app.service.DoctorService;
import com.app.service.HospitalService;
import com.app.service.PatientService;
import com.app.spring_security.UserDetailsService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@RestController
@RequestMapping("/signin")
@CrossOrigin(origins = "*")
public class SignInController {
	
	@Autowired
	private DoctorService doctorService;
	
	@Autowired
	private HospitalService hospitalService;
	
	@Autowired
	private PatientService patientService;
	
	@Autowired
	private AdminService adminService;
	
	@Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userService;
	
	@GetMapping("/{email}/{password}")
	public ResponseEntity<?> signIn(@PathVariable String email,@PathVariable String password){
		SignInResponse response=new SignInResponse();
		if(email.equals("admin@gmail.com")&&password.equals("Admin@164")) {
			response.setId(null);
			response.setName("Admin");
			//return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		Doctor doctor=new Doctor();
		doctor = doctorService.login(email, password);
		if(doctor!=null) {
		if(doctor.getID()!=0&&doctor.getID()!=null) {
			response.setId(doctor.getID());
			response.setName("Doctor");
			//return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		}
		Hospital hospital=new Hospital();
		hospital = hospitalService.login(email, password);
		if(hospital!=null) {
		if(hospital.getID()!=0&&hospital.getID()!=null) {
			response.setId(hospital.getID());
			response.setName("Hospital");
			//return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		}	
		Patient patient=new Patient();
		patient = patientService.login(email, password);
		if(patient!=null) {
		if(patient.getID()!=0&&patient.getID()!=null) {
			response.setId(patient.getID());
			response.setName("Patient");
		}
		}
		return ResponseEntity.status(HttpStatus.OK).body(response);
		
	}
	
	
	@GetMapping("/authenticate/{email}/{password}")
	public ResponseEntity<?> authenticateUser(@PathVariable String email,@PathVariable String password) throws Exception { 
		
		//token generation code 
		try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                    		email,
                    		password
                    )
            );
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }

        final UserDetails userDetails
                = userService.loadUserByUsername(email);

        final String token =
                jwtUtility.generateToken(userDetails);

        
        SignInResponse response=new SignInResponse();
//		if(email.equals("admin@gmail.com")&&password.equals("Admin@164")) {
//			response.setId(null);
//			response.setName("Admin");
//			//return ResponseEntity.status(HttpStatus.OK).body(response);
//		}
		Doctor doctor=new Doctor();
		doctor = doctorService.login(email, password);
		if(doctor!=null) {
		if(doctor.getID()!=0&&doctor.getID()!=null) {
			response.setId(doctor.getID());
			response.setName("Doctor");
			response.setToken(token);
			//return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		}
		Hospital hospital=new Hospital();
		hospital = hospitalService.login(email, password);
		if(hospital!=null) {
		if(hospital.getID()!=0&&hospital.getID()!=null) {
			response.setId(hospital.getID());
			response.setName("Hospital");
			response.setToken(token);
			//return ResponseEntity.status(HttpStatus.OK).body(response);
		}
		}
			
		Patient patient=new Patient();
		patient = patientService.login(email, password);
		if(patient!=null) {
		if(patient.getID()!=0&&patient.getID()!=null) {
			response.setId(patient.getID());
			response.setName("Patient");
			response.setToken(token);
		}
		}
		
		Admin admin=new Admin();
		admin=adminService.login(email, password);
		if(admin!=null) {
			if(admin.getID()!=0&&admin.getID()!=null) {
				response.setId(admin.getID());
				response.setName("Admin");
				response.setToken(token);
			}
			}
		
		return ResponseEntity.status(HttpStatus.OK).body(response);
		
//		EmployeeUserDataBacking user=services.getUserByEmailAndPassword(useData);
//		if(user!=null) {
//			if(user.getPassword()!=null&&user.getPassword().equals(useData.getPassword())) {
//				user.setToken(token);
//				return Response.success(user);
//			}
//				
//			return Response.error("invalid_password");
//		}
//		else
//		return Response.error("invalid_user");
		
	}
	
	
}
