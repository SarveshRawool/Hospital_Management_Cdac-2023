package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "reciept")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "appointment")
public class Reciept {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Column(length = 30)
	private String patientName;
	@Column(length = 100)
	private String problemDescription;
	@JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSZ", shape = JsonFormat.Shape.STRING)
	private String appointmentDate;
	@Column(length = 200)
	private String Prescription;
	private String medicine;
	private Double treatmentPrice;
	
	@OneToOne (fetch = FetchType.LAZY)//mandatory , o.w hib throws MappingExc
	
	@JoinColumn(name="appointment_id")//optional : to specify name of FK col
	//@MapsId//optional BUT reco : to use shared PK between Emp n Address
	@JsonIgnore
	private Appointment appointment;
	
	
}
