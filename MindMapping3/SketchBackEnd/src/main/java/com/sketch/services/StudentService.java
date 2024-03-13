package com.sketch.services;

import java.util.ArrayList;

import javax.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.sketch.models.SketchSharedModel;
import com.sketch.models.StudentModel;
import com.sketch.repositories.SketchSharedRepository;
import com.sketch.repositories.StudentRepository;
import com.sketch.security.JwtTokenUtil;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Service
@Transactional
public class StudentService implements UserDetailsService{
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	private StudentRepository studentRepository;

	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		System.out.println(email);
		StudentModel studentModel = studentRepository.findByEmail(email);
		if(studentModel==null) {
			System.out.println("Student Email Does not exist");
			return null;
		}
		return new org.springframework.security.core.userdetails.User(studentModel.getEmail(), studentModel.getPassword(),
				new ArrayList<>());
	}
	
	public ResponseEntity<String> studentLogin(StudentModel studentModel){
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(studentModel.getEmail(), studentModel.getPassword()));
		} catch (DisabledException e) {
			return ResponseEntity.ok("Student Disabled");
		} catch (BadCredentialsException e) {
			return ResponseEntity.ok("Invalid Login Details");
		}
		final UserDetails userDetails = loadUserByUsername(studentModel.getEmail());
		final String token = jwtTokenUtil.generateToken(userDetails);
		return ResponseEntity.ok(token);
	}
	
	public String studentRegistration(StudentModel studentModel) {
		List <StudentModel> studentModelList = studentRepository.findByEmailOrPhone(studentModel.getEmail(),studentModel.getPhone());
		if(studentModelList.size()>0) {
			return "Duplicate Student Deails";
		}
		studentModel.setPassword(passwordEncoder.encode(studentModel.getPassword()));
		studentRepository.save(studentModel);
		return "Your Account Created Successfull";
	}
	
	public StudentModel getStudentByEmail(String name) {
		StudentModel studentModel = studentRepository.findByEmail(name);
		return studentModel;
	}

	public List<StudentModel> getStudents(String name) {
		List<StudentModel> studentModels = studentRepository.findByEmailNot(name);
		return studentModels;
	}
}
