package com.bootcamp107.business.service.controller;
import com.bootcamp107.business.service.dto.GetBusiness;
import com.bootcamp107.business.service.dto.PostBusiness;
import com.bootcamp107.business.service.service.business.IBusinessService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;



class BusinessControllerTest {

    @InjectMocks
    private BusinessController businessController;

    @Mock
    private IBusinessService businessService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    private PostBusiness createPOSTBusinessDto() {
        return new PostBusiness(
                "12345",
                "123 Main St",
                "Sample Business",
                "456 Elm St",
                2,
                3,
                UUID.randomUUID()
        );
    }


    private GetBusiness createGETBusinessDto() {
        PostBusiness postBusiness = createPOSTBusinessDto();
        return new GetBusiness(
                UUID.randomUUID(),
                postBusiness.getRegistrationNumber(),
                postBusiness.getRegistrationAddress(),
                postBusiness.getName(),
                postBusiness.getTradingAddress(),
                postBusiness.getBusinessCategoryId(),
                postBusiness.getCountryId(),
                postBusiness.getOwnerId()
        );
    }

    @Test
    void addBusiness() {

        GetBusiness getBusiness = createGETBusinessDto();
        PostBusiness postBusiness = createPOSTBusinessDto();
        when(businessService.addBusiness(postBusiness)).thenReturn(getBusiness);
        ResponseEntity<GetBusiness> response = businessController.addBusiness(postBusiness);

        GetBusiness business =response.getBody();
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(postBusiness.getTradingAddress(), business.getTradingAddress());
        assertEquals(postBusiness.getName(), business.getName());
        assertEquals(postBusiness.getBusinessCategoryId(), business.getBusinessCategoryId());
        assertEquals(postBusiness.getCountryId(), business.getCountryId());
        assertEquals(postBusiness.getRegistrationNumber(), business.getRegistrationNumber());
        assertEquals(postBusiness.getRegistrationAddress(), business.getRegistrationAddress());
    }
}
