package com.bootcamp107.business.service.controller;

import com.bootcamp107.business.service.service.businesscategory.BusinessCategoryServiceImpl;
import com.bootcamp107.business.service.dto.GetBusinessCategory;
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

class BusinessCategoryControllerTest {

    @InjectMocks
    private BusinessCategoryController businessCategoryController;

    @Mock
    private BusinessCategoryServiceImpl businessCategoryImplementation;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    private List<GetBusinessCategory> createDummyBusinessCategoryList() {

        List<GetBusinessCategory> dummyBusinessCategoryList = new ArrayList<>();
        dummyBusinessCategoryList.add(new GetBusinessCategory(1, "Design, marketing or communication"));
        dummyBusinessCategoryList.add(new GetBusinessCategory(2, "Others"));
        return dummyBusinessCategoryList;
    }

    @Test
    void getAll() {

        List<GetBusinessCategory> dummyBusinessCategoryList = createDummyBusinessCategoryList();
        when(businessCategoryImplementation.getAll()).thenReturn(dummyBusinessCategoryList);
        ResponseEntity<List<GetBusinessCategory>> responseEntity = businessCategoryController.getAll();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(dummyBusinessCategoryList, responseEntity.getBody());
    }
}
