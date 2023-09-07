package com.bootcamp107.transactionservice.controller;
import com.bootcamp107.transactionservice.dto.CreateBeneficiary;
import com.bootcamp107.transactionservice.dto.GetBeneficiary;
import com.bootcamp107.transactionservice.service.IBeneficiaryService;
import com.bootcamp107.transactionservice.util.MockObject;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BeneficiaryControllerTest {

    @Mock
    private IBeneficiaryService beneficiaryService;

    @InjectMocks
    private BeneficiaryController beneficiaryController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getBeneficiaryByUserId() {

        UUID userId = UUID.randomUUID();
        List<GetBeneficiary> beneficiaries = new ArrayList<>();
        GetBeneficiary getBeneficiary1 = MockObject.createGetBeneficiary(UUID.randomUUID(),"Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        GetBeneficiary getBeneficiary2 = MockObject.createGetBeneficiary(UUID.randomUUID(),"Amit", "Sharma", "amit.sharma@gmail.com", "12345678901", "ABCDEF12345", UUID.randomUUID());
        GetBeneficiary getBeneficiary3 = MockObject.createGetBeneficiary(UUID.randomUUID(),"Suresh", "Patel", "suresh.patel@gmail.com", "23456789012", "BCDEFG23456", UUID.randomUUID());
        beneficiaries = Arrays.asList(getBeneficiary1,getBeneficiary2,getBeneficiary3);
        when(beneficiaryService.getAllBeneficiariesByUserId(userId)).thenReturn(beneficiaries);

        ResponseEntity<List<GetBeneficiary>> response = beneficiaryController.getBeneficiaryByUserId(userId);
        Assertions.assertThat(response.getBody())
                .hasSize(3)
                .containsExactlyInAnyOrder(getBeneficiary1, getBeneficiary2,getBeneficiary3);
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(3, response.getBody().size());
        assertEquals("Ravi", response.getBody().get(0).getFirstName());
        assertEquals("Kumar", response.getBody().get(0).getLastName());
        assertEquals("98765432101", response.getBody().get(0).getAccountNumber());
        assertEquals("ZYXWVU09876", response.getBody().get(0).getIfsc());
        assertEquals("ravi.kumar@gmail.com", response.getBody().get(0).getEmail());

        verify(beneficiaryService).getAllBeneficiariesByUserId(userId);
    }

    @Test
    void saveBeneficiary() {

        CreateBeneficiary createBeneficiary = MockObject.createCreateBeneficiary("Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        GetBeneficiary getBeneficiary = MockObject.createGetBeneficiary(UUID.randomUUID(),"Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        when(beneficiaryService.saveBeneficiary(createBeneficiary)).thenReturn(getBeneficiary);

        ResponseEntity<GetBeneficiary> response = beneficiaryController.saveBeneficiary(createBeneficiary);
        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertNotNull(response.getBody());
        assertEquals("Ravi", response.getBody().getFirstName());
        assertEquals("Kumar", response.getBody().getLastName());
        assertEquals("98765432101", response.getBody().getAccountNumber());
        assertEquals("ZYXWVU09876", response.getBody().getIfsc());
        assertEquals("ravi.kumar@gmail.com", response.getBody().getEmail());

        verify(beneficiaryService).saveBeneficiary(createBeneficiary);
    }
}
