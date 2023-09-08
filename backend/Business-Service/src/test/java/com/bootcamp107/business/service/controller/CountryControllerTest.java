package com.bootcamp107.business.service.controller;

import com.bootcamp107.business.service.dto.GetCountry;
import com.bootcamp107.business.service.service.country.CountryServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class CountryControllerTest {

    @InjectMocks
    private CountryController countryController;

    @Mock
    private CountryServiceImpl countryImplementation;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    private List<GetCountry> createDummyCountryList() {

        List<GetCountry> dummyCountryList = new ArrayList<>();
        dummyCountryList.add(new GetCountry(1, "country 1", "dummyUrl", "+376", "Eur", 90.35));
        dummyCountryList.add(new GetCountry(2, "country 2",  "dummyUrl", "+376", "Eur",  90.35));
        return dummyCountryList;
    }

    @Test
    void getAll() {

        List<GetCountry> dummyCountryList = createDummyCountryList();
        when(countryImplementation.getAll()).thenReturn(dummyCountryList);
        ResponseEntity<List<GetCountry>> responseEntity = countryController.getAll();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(dummyCountryList, responseEntity.getBody());
    }
}
