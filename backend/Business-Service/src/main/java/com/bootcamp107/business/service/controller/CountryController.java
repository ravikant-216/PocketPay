package com.bootcamp107.business.service.controller;

import com.bootcamp107.business.service.dto.GetCountry;
import com.bootcamp107.business.service.service.country.ICountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/businesses/countries")
public class CountryController {
    @Autowired
    private ICountryService countryService;

    @GetMapping
    public ResponseEntity<List<GetCountry>> getAll()
    {
        return ResponseEntity.status(HttpStatus.OK).body(countryService.getAll());
    }
}
