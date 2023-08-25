package com.app.pojos;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.MapsId;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "working_hours")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class WorkingHours extends BaseEntity {
	private	LocalTime officeInTime;
	private	LocalTime officeOutTime;
	
	@OneToOne (fetch = FetchType.LAZY)//mandatory , o.w hib throws MappingExc
	@JoinColumn(name="emp_id")//optional : to specify name of FK col
	@MapsId//optional BUT reco : to use shared PK between Emp n Address
	@JsonIgnore
	private Doctor doctor;
	
}
