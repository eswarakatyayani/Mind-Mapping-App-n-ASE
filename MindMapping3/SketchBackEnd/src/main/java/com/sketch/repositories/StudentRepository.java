package com.sketch.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sketch.models.StudentModel;
@Repository
public interface StudentRepository extends JpaRepository<StudentModel, Long> {

	StudentModel findByEmail(String email);

	List<StudentModel> findByEmailOrPhone(String email, String phone);

	List<StudentModel> findByEmailNot(String name);

}
