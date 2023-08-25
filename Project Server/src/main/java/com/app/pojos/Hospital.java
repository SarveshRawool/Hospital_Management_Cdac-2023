package com.app.pojos;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "hospitals")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = "doctors")
public class Hospital implements UserDetails{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ID;
	@Column(length = 50)
	private String hospitalName;
	@Column(length = 4000)
	private String hospitalInfo;
	@Column(length = 200)
	private String addressLineOne;
	@Column(length = 200)
	private String addressLineTwo;
	@Column(length = 30, unique = true)
	private String email;
	@Column(name="mob_number",length = 10,unique = true)
	private String mobNumber;
	@Column(nullable = false) // =>NOT NULL
	private String password;
	private Long WorkingDays;
	private String imagePath;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	@JsonIgnore
	private HospitalState status;
	
	@OneToMany(mappedBy = "hsptl", 
			cascade = CascadeType.ALL /*, 
			orphanRemoval = true  , fetch = FetchType.EAGER */ )
	@JsonIgnore //To tell Jackson : ignore this property during ser n de-ser.
	//@JsonIgnoreProperties 
	private List<Doctor> doctors = new ArrayList<>();
	
	@OneToMany(mappedBy = "hospital", 
			cascade = CascadeType.ALL /*, 
			orphanRemoval = true  , fetch = FetchType.EAGER */ )
	@JsonIgnore
	private List<Appointment> appointments = new ArrayList<>();
	
	public void addDoctor(Doctor e)
	{
		doctors.add(e);//parent --> child link
		e.setHsptl(this);//child --> parent
	}
	public void removeDoctor(Doctor e)
	{
		doctors.remove(e);//parent ---X----> child link
		e.setHsptl(null);//child ---X---> parent
	}
	public void addAppointment(Appointment e)
	{
		appointments.add(e);//parent --> child link
		e.setHospital(this);//child --> parent
	}
	public void removeAppointment(Appointment e)
	{
		appointments.remove(e);//parent ---X----> child link
		e.setHospital(null);//child ---X---> parent
	}
	@JsonIgnore
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> grantedAuthorities=new ArrayList<GrantedAuthority>();
		grantedAuthorities.add(new SimpleGrantedAuthority("Hospital"));

		return grantedAuthorities;
	}
	@JsonIgnore
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}
	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	@JsonIgnore
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
}
