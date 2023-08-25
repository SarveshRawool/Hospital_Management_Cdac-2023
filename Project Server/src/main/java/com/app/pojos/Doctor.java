package com.app.pojos;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
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
import lombok.ToString;

@Entity
@Table(name = "doctors")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString(exclude = {"hsptl","appointments"})
public class Doctor extends BaseEntity implements UserDetails {
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
	private Double experience;
	@Column(length = 30)
	private String speciality;
	private Double charges;
	@ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.MERGE)//MERGE : NEW n INTERESTING !!!!!
	@JoinColumn(name = "hospital_id") // Optional BUT reco , to specify the name of FK col.
	@JsonIgnore
	private Hospital hsptl;
	private String imagePath;
	
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	@JsonIgnore
	private HospitalState status;
	
	@OneToMany(mappedBy = "doctor", 
			cascade = CascadeType.ALL, 
			orphanRemoval = true /* , fetch = FetchType.EAGER */ )
	@JsonIgnore
	private List<Appointment> appointments = new ArrayList<>();
	
	
	
	public void addAppointment(Appointment e)
	{
		appointments.add(e);//parent --> child link
		e.setDoctor(this);//child --> parent
	}
	public void removeAppointment(Appointment e)
	{
		appointments.remove(e);//parent ---X----> child link
		e.setDoctor(null);//child ---X---> parent
	}
	@JsonIgnore
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<GrantedAuthority> grantedAuthorities=new ArrayList<GrantedAuthority>();
		grantedAuthorities.add(new SimpleGrantedAuthority("Doctor"));

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
