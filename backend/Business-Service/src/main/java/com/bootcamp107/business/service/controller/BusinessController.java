package com.bootcamp107.business.service.controller;

import com.bootcamp107.business.service.dto.GetBusiness;
import com.bootcamp107.business.service.dto.PostBusiness;
import com.bootcamp107.business.service.service.business.IBusinessService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/businesses/business")
public class BusinessController {

    @Autowired
    private IBusinessService businessService;

    @PostMapping
    public ResponseEntity<GetBusiness> addBusiness(@RequestBody PostBusiness businessDto)
    {

        return ResponseEntity.status(HttpStatus.CREATED).body( businessService.addBusiness(businessDto));
    }

}
