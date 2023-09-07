package com.bootcamp107.transactionservice.service.implementation;
import com.bootcamp107.transactionservice.dto.CreateBeneficiary;
import com.bootcamp107.transactionservice.dto.GetBeneficiary;
import com.bootcamp107.transactionservice.entity.Beneficiary;
import com.bootcamp107.transactionservice.mapper.BeneficiaryMapper;
import com.bootcamp107.transactionservice.repository.BeneficiaryRepository;
import com.bootcamp107.transactionservice.util.MockObject;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;
import static org.mockito.Mockito.*;
import java.util.*;
class BeneficiaryServiceImplTest {

    @Mock
    private ModelMapper modelMapper;

    @Mock
    private BeneficiaryMapper beneficiaryMapper;

    @Mock
    private BeneficiaryRepository beneficiaryRepository;

    @InjectMocks
    private BeneficiaryServiceImpl beneficiaryService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllBeneficiariesByUserId() {

        UUID userId = UUID.randomUUID();
        Beneficiary beneficiary1 = MockObject.createBeneficiary("Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        Beneficiary beneficiary2 = MockObject.createBeneficiary("Amit", "Sharma", "amit.sharma@gmail.com", "12345678901", "ABCDEF12345", UUID.randomUUID());
        Beneficiary beneficiary3 = MockObject.createBeneficiary("Suresh", "Patel", "suresh.patel@gmail.com", "23456789012", "BCDEFG23456", UUID.randomUUID());
        List<Beneficiary> beneficiaries = Arrays.asList(beneficiary1,beneficiary2,beneficiary3);
        when(beneficiaryRepository.findByUserId(userId)).thenReturn(beneficiaries);
        GetBeneficiary getBeneficiary1 = MockObject.createGetBeneficiary(UUID.randomUUID(),"Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        GetBeneficiary getBeneficiary2 = MockObject.createGetBeneficiary(UUID.randomUUID(),"Amit", "Sharma", "amit.sharma@gmail.com", "12345678901", "ABCDEF12345", UUID.randomUUID());
        GetBeneficiary getBeneficiary3 = MockObject.createGetBeneficiary(UUID.randomUUID(),"Suresh", "Patel", "suresh.patel@gmail.com", "23456789012", "BCDEFG23456", UUID.randomUUID());

        when(beneficiaryMapper.convertToGetBeneficiary(beneficiary1)).thenReturn(getBeneficiary1);
        when(beneficiaryMapper.convertToGetBeneficiary(beneficiary2)).thenReturn(getBeneficiary2);
        when(beneficiaryMapper.convertToGetBeneficiary(beneficiary3)).thenReturn(getBeneficiary3);
        List<GetBeneficiary> result = beneficiaryService.getAllBeneficiariesByUserId(userId);
        Assertions.assertThat(result)
                .hasSize(3)
                .containsExactlyInAnyOrder(getBeneficiary1, getBeneficiary2,getBeneficiary3);
        assertEquals(3, result.size());
        assertEquals("Ravi", result.get(0).getFirstName());
        assertEquals("Kumar", result.get(0).getLastName());
        assertEquals("98765432101", result.get(0).getAccountNumber());
        assertEquals("ZYXWVU09876", result.get(0).getIfsc());
        assertEquals("ravi.kumar@gmail.com", result.get(0).getEmail());

        verify(beneficiaryRepository).findByUserId(userId);
        verify(beneficiaryMapper, times(3)).convertToGetBeneficiary(any(Beneficiary.class));

    }

    @Test
    void getAllBeneficiariesByUserId_emptyList() {

        UUID userId = UUID.randomUUID();
        when(beneficiaryRepository.findByUserId(userId)).thenReturn(new ArrayList<>());

        assertThrows(NoSuchElementException.class, () -> beneficiaryService.getAllBeneficiariesByUserId(userId));

        verify(beneficiaryRepository).findByUserId(userId);
    }

    @Test
    void testGetAllBeneficiariesByUserIdNoData() {

        UUID userId = UUID.randomUUID();
        when(beneficiaryRepository.findByUserId(userId)).thenReturn(Collections.emptyList());
        assertThrows(
                NoSuchElementException.class,
                () -> beneficiaryService.getAllBeneficiariesByUserId(userId)
        );
        verify(beneficiaryRepository).findByUserId(userId);
        verify(beneficiaryMapper, never()).convertToGetBeneficiary(any(Beneficiary.class));
    }

    @Test
    void testSaveBeneficiary() {

       CreateBeneficiary createBeneficiary = MockObject.createCreateBeneficiary("Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        Beneficiary beneficiary = MockObject.createBeneficiary("Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        when(beneficiaryMapper.convertToEntity(createBeneficiary)).thenReturn(beneficiary);
        when(beneficiaryRepository.save(beneficiary)).thenReturn(beneficiary);
        when(beneficiaryMapper.convertToGetBeneficiary(beneficiary)).thenReturn(MockObject.createGetBeneficiary(UUID.randomUUID(),"Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID()));

        GetBeneficiary result = beneficiaryService.saveBeneficiary(createBeneficiary);
        assertNotNull(result);
        assertEquals("Ravi", result.getFirstName());
        assertEquals("Kumar", result.getLastName());
        assertEquals("98765432101", result.getAccountNumber());
        assertEquals("ZYXWVU09876", result.getIfsc());
        assertEquals("ravi.kumar@gmail.com", result.getEmail());

        verify(beneficiaryMapper).convertToEntity(createBeneficiary);
        verify(beneficiaryRepository).save(beneficiary);
        verify(beneficiaryMapper).convertToGetBeneficiary(beneficiary);
    }

    @Test
    void testGetAllBeneficiaries() {
        Beneficiary beneficiary1 = MockObject.createBeneficiary("Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        Beneficiary beneficiary2 = MockObject.createBeneficiary("Amit", "Sharma", "amit.sharma@gmail.com", "12345678901", "ABCDEF12345", UUID.randomUUID());
        Beneficiary beneficiary3 = MockObject.createBeneficiary("Suresh", "Patel", "suresh.patel@gmail.com", "23456789012", "BCDEFG23456", UUID.randomUUID());
        List<Beneficiary> beneficiaries = Arrays.asList(beneficiary1, beneficiary2, beneficiary3);
        when(beneficiaryRepository.findAll()).thenReturn(beneficiaries);
        GetBeneficiary getBeneficiary1 = MockObject.createGetBeneficiary(UUID.randomUUID(), "Ravi", "Kumar", "ravi.kumar@gmail.com", "98765432101", "ZYXWVU09876", UUID.randomUUID());
        GetBeneficiary getBeneficiary2 = MockObject.createGetBeneficiary(UUID.randomUUID(), "Amit", "Sharma", "amit.sharma@gmail.com", "12345678901", "ABCDEF12345", UUID.randomUUID());
        GetBeneficiary getBeneficiary3 = MockObject.createGetBeneficiary(UUID.randomUUID(), "Suresh", "Patel", "suresh.patel@gmail.com", "23456789012", "BCDEFG23456", UUID.randomUUID());

        when(beneficiaryMapper.convertToGetBeneficiary(beneficiary1)).thenReturn(getBeneficiary1);
        when(beneficiaryMapper.convertToGetBeneficiary(beneficiary2)).thenReturn(getBeneficiary2);
        when(beneficiaryMapper.convertToGetBeneficiary(beneficiary3)).thenReturn(getBeneficiary3);

        List<GetBeneficiary> result = beneficiaryService.getAllBeneficiaries();
        Assertions.assertThat(result)
                .hasSize(3)
                .containsExactlyInAnyOrder(getBeneficiary1, getBeneficiary2, getBeneficiary3);

        verify(beneficiaryRepository).findAll();
        verify(beneficiaryMapper, times(3)).convertToGetBeneficiary(any(Beneficiary.class));
    }

    @Test
    void testGetBeneficiariesByEmail() {
        String email = "ravi.kumar@gmail.com";
        Beneficiary beneficiary = MockObject.createBeneficiary("Ravi", "Kumar", email, "98765432101", "ZYXWVU09876", UUID.randomUUID());
        when(beneficiaryRepository.findByEmail(email)).thenReturn(Optional.of(beneficiary));
        GetBeneficiary getBeneficiary = MockObject.createGetBeneficiary(UUID.randomUUID(), "Ravi", "Kumar", email, "98765432101", "ZYXWVU09876", UUID.randomUUID());
        when(beneficiaryMapper.convertToGetBeneficiary(beneficiary)).thenReturn(getBeneficiary);

        GetBeneficiary result = beneficiaryService.getBeneficiariesByEmail(email);
        Assertions.assertThat(result).isEqualTo(getBeneficiary);

        verify(beneficiaryRepository).findByEmail(email);
        verify(beneficiaryMapper).convertToGetBeneficiary(beneficiary);
    }

    @Test
    void testGetBeneficiariesByEmail_noDataFound() {
        String email = "ravi.kumar@gmail.com";
        when(beneficiaryRepository.findByEmail(email)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> beneficiaryService.getBeneficiariesByEmail(email));

        verify(beneficiaryRepository).findByEmail(email);
    }
}