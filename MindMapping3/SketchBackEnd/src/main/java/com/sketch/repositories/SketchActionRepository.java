package com.sketch.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sketch.models.SketchActionModel;
import com.sketch.models.SketchModel;
@Repository
public interface SketchActionRepository extends JpaRepository<com.sketch.models.SketchActionModel, Long> {

	List<SketchActionModel> findBySketchModel(SketchModel sketchModel);

	void deleteBySketchModel(SketchModel sketchModel);

}
