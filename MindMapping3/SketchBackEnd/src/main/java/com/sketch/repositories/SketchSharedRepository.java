package com.sketch.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sketch.models.SketchModel;
import com.sketch.models.SketchSharedModel;
import com.sketch.models.StudentModel;

public interface SketchSharedRepository extends JpaRepository<SketchSharedModel, Long> {

	List<SketchSharedModel> findBySketchModelAndStudentModelSenderAndStudentModelReceiver(SketchModel sketchModel,
			StudentModel studentModelSender, StudentModel studentModelReceiver);

	List<SketchSharedModel> findByStudentModelSender(StudentModel studentModel);

	List<SketchSharedModel> findByStudentModelReceiver(StudentModel studentModel);

}
