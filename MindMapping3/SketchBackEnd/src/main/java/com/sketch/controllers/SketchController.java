package com.sketch.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sketch.models.SketchActionModel;
import com.sketch.models.SketchModel;
import com.sketch.models.SketchSharedModel;
import com.sketch.services.SketchService;

import java.security.Principal;
import java.util.List;
@RestController
public class SketchController {
	@Autowired
	private SketchService sketchService;
	
	@PostMapping("/sketch")
	public String addSketch(@RequestBody List<SketchActionModel> sketchActionModels,Principal principal, @RequestParam("sketchId") String sketchId) {
		System.out.println(sketchActionModels.size());
		return sketchService.addSketch(sketchActionModels,principal.getName(),sketchId);
	}
	
	@GetMapping("/sketch")
	public List<SketchModel> getSketchs(Principal principal){
		return sketchService.getSketchs(principal.getName());
	}
	
	@GetMapping("/sketch/{sketchId}")
	public List<SketchActionModel> getSketchActions(@PathVariable("sketchId") long sketchId){
		return sketchService.getSketchActions(sketchId);
	}
	
	@GetMapping("/share")
	public String shareSketch(Principal principal, @RequestParam("sketchId") String sketchId, @RequestParam("studentId") String studentId){
		return sketchService.shareSketch(principal.getName(),studentId,sketchId);
	}
	
	@GetMapping("/shared")
	public List<SketchSharedModel> getShared(Principal principal){
		return sketchService.getShared(principal.getName());
	}
	@GetMapping("/received")
	public List<SketchSharedModel> getReceived(Principal principal){
		return sketchService.getReceived(principal.getName());
	}
}
