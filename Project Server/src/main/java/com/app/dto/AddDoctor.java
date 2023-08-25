package com.app.dto;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import org.hibernate.validator.constraints.Length;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddDoctor  {
	@JsonProperty(access = Access.READ_ONLY) // used during serialization
	private Long id;
	@NotBlank(message = "first name can't be blank")
	private String firstName;
	@Length(min = 3, max = 20, message = "Invalid length of last name")
	private String lastName;
	private String gendeer;
	@Email
	private String email;
	
	private String mobNumber;
	@NotNull
	@Pattern(regexp = "((?=.*\\d)(?=.*[a-z])(?=.*[#@$*]).{5,20})",message = "invalid password format!!!!")
	private String password;
	@NotBlank(message = "Address Line One can't be blank")
	private String addressLineOne;
	@NotBlank(message = "Address Line Two can't be blank")
	private String addressLineTwo;
	private Double experience;
	@NotNull(message = "Speciality must be supplied!!!!")
	private String speciality;
	@NotNull
	@Min(value = 30000, message = "charges must be > 500")
	@Max(value = 150000, message = "charges must be < 30000")
	private Double charges;
	//private MultipartFile imageFile;
	
}
