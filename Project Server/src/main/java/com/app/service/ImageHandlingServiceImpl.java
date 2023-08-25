package com.app.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.transaction.Transactional;

import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.custom_exceptions.ApiException;
import com.app.custom_exceptions.ResourceNotFoundException;
import com.app.dao.DoctorDao;
import com.app.dao.HospitalDao;
import com.app.dto.ApiResponse;
import com.app.pojos.Doctor;
import com.app.pojos.Hospital;

@Service
@Transactional
public class ImageHandlingServiceImpl implements ImageHandlingService {
	
	@Autowired
	private HospitalDao hospitalDao;
	@Autowired
	private DoctorDao doctorDao;
	
	@Value("${folder.location}")
	private String folderLocation;
	
	@PostConstruct
	public void init() {
		System.out.println("in init " + folderLocation);
		// chk if folder exists --yes --continue
		File folder = new File(folderLocation);
		if (folder.exists()) {
			System.out.println("folder exists alrdy !");
		} else {
			// no --create a folder
			folder.mkdir();
			System.out.println("created a folder !");
		}
	}

	@Override
	public ApiResponse uploadImage(Long empId, MultipartFile image) throws IOException {
		// get emp from emp id
				Hospital hospital = hospitalDao.findById(empId).orElseThrow(() -> new ResourceNotFoundException("Invalid emp ID!!!!"));
				// emp found --> PERSISTENT
				// store the image on server side folder
				String path = folderLocation.concat("hospital/").concat(image.getOriginalFilename());
				System.out.println(path);
				// Use FileUtils method : writeByte[] --> File
				FileUtils.writeByteArrayToFile(new File(path), image.getBytes());
				// set image path
				hospital.setImagePath(path);
				// OR to store the img directly in DB as a BLOB
				// emp.setImage(image.getBytes());
				return new ApiResponse("Image file uploaded successfully for emp id " + empId);
	}

	@Override
	public byte[] downloadImage(Long empId) throws IOException {
		// get emp by id
		Hospital hospital = hospitalDao.findById(empId).orElseThrow(() -> new ResourceNotFoundException("Invalid emp ID!!!!"));
				// emp found --> PERSISTENT
				String path = hospital.getImagePath();
				if (path != null) {
					// path ---> File --> byte[]
					return FileUtils.readFileToByteArray(new File(path));
					//OR from DB : return emp.getImage();
				} else
					throw new ApiException("Image not yet assigned !!!!");
			}
	
	@Override
	public List<byte[]> downloadAllImages() throws IOException {	
		
		List<Hospital> HospitalList= hospitalDao.findAll();
		
		List<byte[]> images= new ArrayList<byte[]>();
		
		for (Hospital hospital : HospitalList) {
			String path = hospital.getImagePath();
			if (path != null) {
				// path ---> File --> byte[]
				images.add(FileUtils.readFileToByteArray(new File(path)));
			}
		}
		
		return images;
	}
	
	
	
	
	
	@Override
	public ApiResponse uploadDoctorsImage(Long empId, MultipartFile image) throws IOException {
		// get emp from emp id
				Doctor doctor = doctorDao.findById(empId).orElseThrow(() -> new ResourceNotFoundException("Invalid Doctor ID!!!!"));
				// emp found --> PERSISTENT
				// store the image on server side folder
				String path = folderLocation.concat("doctor/").concat(image.getOriginalFilename());
				System.out.println(path);
				// Use FileUtils method : writeByte[] --> File
				FileUtils.writeByteArrayToFile(new File(path), image.getBytes());
				// set image path
				doctor.setImagePath(path);
				// OR to store the img directly in DB as a BLOB
				// emp.setImage(image.getBytes());
				return new ApiResponse("Image file uploaded successfully for doctor id " + empId);
	}

	@Override
	public byte[] downloadDoctorsImage(Long empId) throws IOException {
		// get emp by id
		Doctor doctor = doctorDao.findById(empId).orElseThrow(() -> new ResourceNotFoundException("Invalid Doctor ID!!!!"));
				// emp found --> PERSISTENT
				String path = doctor.getImagePath();
				if (path != null) {
					// path ---> File --> byte[]
					return FileUtils.readFileToByteArray(new File(path));
					//OR from DB : return emp.getImage();
				} else
					throw new ApiException("Image not yet assigned !!!!");
			}
	

}
