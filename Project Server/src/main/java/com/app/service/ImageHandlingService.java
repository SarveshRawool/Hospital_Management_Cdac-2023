package com.app.service;

import java.io.IOException;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.dto.ApiResponse;

public interface ImageHandlingService {
	ApiResponse uploadImage(Long empId, MultipartFile image) throws IOException;
	byte[] downloadImage(Long empId) throws IOException;
	List<byte[]> downloadAllImages() throws IOException;
	ApiResponse uploadDoctorsImage(Long empId, MultipartFile image) throws IOException;
	byte[] downloadDoctorsImage(Long empId) throws IOException;
}
