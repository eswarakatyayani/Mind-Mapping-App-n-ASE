package com.sketch.services;

import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sketch.models.SketchActionModel;
import com.sketch.models.SketchModel;
import com.sketch.models.SketchSharedModel;
import com.sketch.models.StudentModel;
import com.sketch.repositories.SketchActionRepository;
import com.sketch.repositories.SketchRepository;
import com.sketch.repositories.SketchSharedRepository;
import com.sketch.repositories.StudentRepository;
import com.sketch.security.GmailEmailSending;

@Transactional
@Service
public class SketchService {
	@Autowired
	private StudentRepository studentRepository;
	
	@Autowired
	private SketchRepository sketchRepository;
	
	@Autowired
	private SketchActionRepository sketchActionRepository;
	
	@Autowired
	private SketchSharedRepository sketchSharedRepository;

	public String addSketch(List<SketchActionModel> sketchActionModels, String name, String sketchId) {
		StudentModel studentModel = studentRepository.findByEmail(name);
		SketchModel sketchModel = null;
		if(sketchId.equalsIgnoreCase("undefined")) {
			sketchModel = new SketchModel();
			sketchModel.setDate(""+new Date());
			sketchModel.setStudentModel(studentModel);
			sketchModel = sketchRepository.save(sketchModel);
		}else {
			sketchModel = sketchRepository.findById(Long.parseLong(sketchId)).get();
			sketchActionRepository.deleteBySketchModel(sketchModel);
		}
		Iterator<SketchActionModel> sketchActionModelIterator = sketchActionModels.iterator();
		while (sketchActionModelIterator.hasNext()) {
			SketchActionModel sketchActionModel = (SketchActionModel) sketchActionModelIterator.next();
			sketchActionModel.setSketchModel(sketchModel);
			sketchActionRepository.save(sketchActionModel);
		}
		return "Sketch Saved Successfully";
	}

	public List<SketchModel> getSketchs(String name) {
		StudentModel studentModel = studentRepository.findByEmail(name);
		List<SketchModel> sketchModels = sketchRepository.findByStudentModel(studentModel);
		Collections.reverse(sketchModels);
		return sketchModels;
	}

	public List<SketchActionModel> getSketchActions(long sketchId) {
		SketchModel sketchModel = sketchRepository.findById(sketchId).get();
		List<SketchActionModel> sketchActionModels = sketchActionRepository.findBySketchModel(sketchModel);
		return sketchActionModels;
	}

	public String shareSketch(String name, String studentId, String sketchId) {
		SketchModel sketchModel = sketchRepository.findById(Long.parseLong(sketchId)).get();
		StudentModel studentModelSender = studentRepository.findByEmail(name);
		StudentModel studentModelReceiver = studentRepository.findById(Long.parseLong(studentId)).get();
		List<SketchSharedModel> sketchSharedModels = sketchSharedRepository.findBySketchModelAndStudentModelSenderAndStudentModelReceiver(sketchModel,studentModelSender,studentModelReceiver);
		if(sketchSharedModels.size()>0) {
			return "This Sketch is already Shared to "+studentModelReceiver.getName();
		}
		SketchSharedModel sketchSharedModel =new SketchSharedModel();
		sketchSharedModel.setSharedDate(new Date());
		sketchSharedModel.setStudentModelSender(studentModelSender);
		sketchSharedModel.setStudentModelReceiver(studentModelReceiver);
		sketchSharedModel.setSketchModel(sketchModel);
		sketchSharedModel = sketchSharedRepository.save(sketchSharedModel);
		String message = "Sketch is Shared by "+sketchSharedModel.getStudentModelSender().getName()+" Access with Link http://localhost:3000/student/home?sketchId="+sketchSharedModel.getSketchSharedId();
		GmailEmailSending.send_message(studentModelReceiver.getEmail(), "Sketch is Shared", message);
		return "Sketch Shared Successfully";
	}

	public List<SketchSharedModel> getShared(String name) {
		StudentModel studentModel = studentRepository.findByEmail(name);
		List<SketchSharedModel> sketchSharedModels = sketchSharedRepository.findByStudentModelSender(studentModel);
		Collections.reverse(sketchSharedModels);
		return sketchSharedModels;
	}

	public List<SketchSharedModel> getReceived(String name) {
		StudentModel studentModel = studentRepository.findByEmail(name);
		List<SketchSharedModel> sketchSharedModels = sketchSharedRepository.findByStudentModelReceiver(studentModel);
		Collections.reverse(sketchSharedModels);
		return sketchSharedModels;
	}

	
}
