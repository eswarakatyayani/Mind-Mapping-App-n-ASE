package com.sketch.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sketch.models.SketchModel;
import com.sketch.models.StudentModel;
@Repository
public interface SketchRepository extends JpaRepository<SketchModel, Long> {

	List<SketchModel> findByStudentModel(StudentModel studentModel);

}
