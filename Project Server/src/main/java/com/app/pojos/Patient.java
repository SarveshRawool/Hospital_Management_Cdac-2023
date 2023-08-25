package com.app.pojos;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "patients")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Patient extends BaseEntity implements UserDetails{
	@Column(length = 30)
	private String firstName;
	@Column(length = 30)
	private String lastName;
	@Column(length = 30)
	private String gendeer;
	private String email;
	@Column(name="mob_number",length = 10,unique = true)
	private String mobNumber;
	@Column(nullable = false)
	private String password;
	@Column(length = 20)
	private String addressLineOne;
	@Column(length = 20)
	private String addressLineTwo;
	
	@OneToMany(mappedBy = "patient", 
			cascade = CascadeType.ALL, 
			orphanRemoval = true /* , fetch = FetchType.EAGER */ )
	@JsonIgnore //To tell Jackson : ignore this property during ser n de-ser.
	//@JsonIgnoreProperties 
	private List<Appointment> appointments = new ArrayList<>();
	
	public void addAppointment(Appointment e)
	{
		appointments.add(e);//parent --> child link
		e.setPatient(this);//child --> parent
	}
	public void removeAppointment(Appointment e)
	{
		appointments.remove(e);//parent ---X----> child link
		e.setPatient(null);//child ---X---> parent
	}
	@JsonIgnore
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> grantedAuthorities=new ArrayList<GrantedAuthority>();
		grantedAuthorities.add(new SimpleGrantedAuthority("Patient"));

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
