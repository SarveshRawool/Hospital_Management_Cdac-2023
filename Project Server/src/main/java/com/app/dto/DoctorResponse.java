package com.app.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DoctorResponse {
	private Long id;
	private String firstName;
	private String lastName;
	private String gendeer;
	private String email;
	private String mobNumber;
	private String addressLineOne;
	private String addressLineTwo;
	private Double experience;
	private String speciality;
	private Double charges;
}
