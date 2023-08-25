package com.app.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignInResponse {
	private Long id;
	private String name;
	private String token;
}
