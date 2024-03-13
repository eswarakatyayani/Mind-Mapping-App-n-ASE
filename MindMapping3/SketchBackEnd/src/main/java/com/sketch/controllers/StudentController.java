package com.sketch.controllers;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sketch.models.StudentModel;
import com.sketch.services.StudentService;

@RestController
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	@PostMapping("/studentRegistration")
	public String studentRegistration(@RequestBody StudentModel studentModell) {
		return studentService.studentRegistration(studentModell);
	}
	
	@PostMapping("/studentLogin")
	public ResponseEntity<String>  studentLogin(@RequestBody StudentModel studentModell){
		return studentService.studentLogin(studentModell);
	}
	
	@GetMapping("/student")
	public StudentModel getStudentByEmail(Principal principal) {
		return studentService.getStudentByEmail(principal.getName());
	}
	
	@GetMapping("/students")
	public List<StudentModel> getStudents(Principal principal) {
		return studentService.getStudents(principal.getName());
	}
}
