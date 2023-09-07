package com.bootcamp107.business.service.controller;

import com.bootcamp107.business.service.dto.GetBusinessCategory;
import com.bootcamp107.business.service.service.businesscategory.IBusinessCategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("api/v1/businesses/business_categories")
public class BusinessCategoryController {

    @Autowired
    private IBusinessCategoryService businessCategoryService;

    @GetMapping
    public ResponseEntity<List<GetBusinessCategory>> getAll()
    {
        return ResponseEntity.status(HttpStatus.OK).body(businessCategoryService.getAll());
    }

}