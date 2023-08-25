package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "appointments")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"doctor","patient"})
public class Appointment{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
//	@DateTimeFormat(pattern = "yyyy-MM-dd")
//	private LocalDateTime appointmentDate;
	
	
	 @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", shape = JsonFormat.Shape.STRING)
	 private String startDate;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private StatusType status;
	@Column(length = 50)
	private String diseases;
	@Column(length = 40)
	private String hospitalName;
	@Column(length = 30)
	private String doctorName;
	@Column(length = 30)
	private String patientName;
	@Column(length = 400)
	private String hospitalAddress;
	private Double cost;
	
	
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)//MERGE : NEW n INTERESTING !!!!!
	@JoinColumn(name = "doctor_id") // Optional BUT reco , to specify the name of FK col.
	@JsonIgnore
	private Doctor doctor;
	
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)//MERGE : NEW n INTERESTING !!!!!
	@JoinColumn(name = "hospital_id") // Optional BUT reco , to specify the name of FK col.
	@JsonIgnore
	private Hospital hospital;
	
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)//MERGE : NEW n INTERESTING !!!!!
	@JoinColumn(name = "patient_id") // Optional BUT reco , to specify the name of FK col.
	@JsonIgnore
	private Patient patient;
	
}
