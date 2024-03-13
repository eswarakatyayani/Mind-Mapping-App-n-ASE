package com.sketch.models;

import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
public class SketchSharedModel {
	
	@Id
    @GeneratedValue
	private long sketchSharedId;
	
	private Date sharedDate;
	
	@Transient
	private long sketchId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name = "sketchId")
	private SketchModel sketchModel;
	
	@Transient
	private long studentModelSenderId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name = "studentModelSenderId")
	private StudentModel studentModelSender;
	
	@Transient
	private long studentModelReceiverId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name = "studentModelReceiverId")
	private StudentModel studentModelReceiver;

	
	
	public long getSketchSharedId() {
		return sketchSharedId;
	}
	public void setSketchSharedId(long sketchSharedId) {
		this.sketchSharedId = sketchSharedId;
	}
	public Date getSharedDate() {
		return sharedDate;
	}
	public void setSharedDate(Date sharedDate) {
		this.sharedDate = sharedDate;
	}
	public long getSketchId() {
		return sketchId;
	}
	public void setSketchId(long sketchId) {
		this.sketchId = sketchId;
	}
	public SketchModel getSketchModel() {
		return sketchModel;
	}
	public void setSketchModel(SketchModel sketchModel) {
		this.sketchModel = sketchModel;
	}
	public long getStudentModelSenderId() {
		return studentModelSenderId;
	}
	public void setStudentModelSenderId(long studentModelSenderId) {
		this.studentModelSenderId = studentModelSenderId;
	}
	public StudentModel getStudentModelSender() {
		return studentModelSender;
	}
	public void setStudentModelSender(StudentModel studentModelSender) {
		this.studentModelSender = studentModelSender;
	}
	public long getStudentModelReceiverId() {
		return studentModelReceiverId;
	}
	public void setStudentModelReceiverId(long studentModelReceiverId) {
		this.studentModelReceiverId = studentModelReceiverId;
	}
	public StudentModel getStudentModelReceiver() {
		return studentModelReceiver;
	}
	public void setStudentModelReceiver(StudentModel studentModelReceiver) {
		this.studentModelReceiver = studentModelReceiver;
	}
	
	
	
}
