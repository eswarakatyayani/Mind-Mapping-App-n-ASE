package com.sketch.models;

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
public class SketchActionModel {
	@Id
    @GeneratedValue
	private long sketchActionId;
	
	@Transient
	private long sketchId;
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	@ManyToOne(fetch = FetchType.LAZY,cascade = {CascadeType.DETACH,CascadeType.PERSIST,CascadeType.REFRESH,CascadeType.MERGE})
	@JoinColumn(name = "sketchId")
	private SketchModel sketchModel;
	
	private String action;
	private String elementName;
	private String fontSize;
	private String iconId;
	private String leftt;
	private String stroke;
	private String strokeWidth;
	private String text;
	private String top;
	private String transform;
	private String fill;
	public long getSketchActionId() {
		return sketchActionId;
	}
	public void setSketchActionId(long sketchActionId) {
		this.sketchActionId = sketchActionId;
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
	public String getAction() {
		return action;
	}
	public void setAction(String action) {
		this.action = action;
	}
	public String getElementName() {
		return elementName;
	}
	public void setElementName(String elementName) {
		this.elementName = elementName;
	}
	public String getFontSize() {
		return fontSize;
	}
	public void setFontSize(String fontSize) {
		this.fontSize = fontSize;
	}
	public String getIconId() {
		return iconId;
	}
	public void setIconId(String iconId) {
		this.iconId = iconId;
	}
	public String getLeftt() {
		return leftt;
	}
	public void setLeftt(String leftt) {
		this.leftt = leftt;
	}
	public String getStroke() {
		return stroke;
	}
	public void setStroke(String stroke) {
		this.stroke = stroke;
	}
	public String getStrokeWidth() {
		return strokeWidth;
	}
	public void setStrokeWidth(String strokeWidth) {
		this.strokeWidth = strokeWidth;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getTop() {
		return top;
	}
	public void setTop(String top) {
		this.top = top;
	}
	public String getTransform() {
		return transform;
	}
	public void setTransform(String transform) {
		this.transform = transform;
	}
	public String getFill() {
		return fill;
	}
	public void setFill(String fill) {
		this.fill = fill;
	}
	
}
