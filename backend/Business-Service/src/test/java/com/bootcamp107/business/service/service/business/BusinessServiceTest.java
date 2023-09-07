package com.bootcamp107.business.service.service.business;


import com.bootcamp107.business.service.dto.GetBusiness;
import com.bootcamp107.business.service.dto.PostBusiness;
import com.bootcamp107.business.service.entity.Business;
import com.bootcamp107.business.service.mapper.BusinessMapper;
import com.bootcamp107.business.service.repository.BusinessRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.UUID;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

class BusinessServiceTest {

    @InjectMocks
    private BusinessServiceImpl businessImplementation;

    @Mock
    private BusinessRepository businessRepository;

    @Mock
    private BusinessMapper businessMapper;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    private Business business() {
        return new Business(UUID.randomUUID(),
                "12345",
                "123 Main St",
                "Sample Business",
                "456 Elm St",
                2,
                3,
                UUID.randomUUID());
    }

    private PostBusiness createPOSTBusinessDto() {
        Business business = business();
        return new PostBusiness(
                business.getRegistrationNumber(),
                business.getRegistrationAddress(),
                business.getName(),
                business.getTradingAddress(),
                business.getBusinessCategoryId(),
                business.getCountryId(),
                business.getOwnerId()
        );
    }

    private GetBusiness createGETBusinessDto() {
        Business business = business();
        return new GetBusiness(
                business.getId(),
                business.getRegistrationNumber(),
                business.getRegistrationAddress(),
                business.getName(),
                business.getTradingAddress(),
                business.getBusinessCategoryId(),
                business.getCountryId(),
                business.getOwnerId()
        );
    }

    @Test
    void addBusiness() {

        PostBusiness postBusiness = createPOSTBusinessDto();
        GetBusiness getBusinessDto =createGETBusinessDto();
        Business mockBusiness = business();
        when(businessMapper.convertDtoToEntity(postBusiness)).thenReturn(mockBusiness);
        when(businessMapper.convertEntityToDto(mockBusiness)).thenReturn(getBusinessDto);
        when(businessRepository.save(mockBusiness)).thenReturn(mockBusiness);
        GetBusiness result = businessImplementation.addBusiness(postBusiness);
        verify(businessRepository, times(1)).save(mockBusiness);
        verify(businessMapper, times(1)).convertDtoToEntity(postBusiness);
        verify(businessMapper, times(1)).convertEntityToDto(mockBusiness);

        assertEquals(postBusiness.getTradingAddress(), result.getTradingAddress());
        assertEquals(postBusiness.getName(), result.getName());
        assertEquals(postBusiness.getBusinessCategoryId(), result.getBusinessCategoryId());
        assertEquals(postBusiness.getRegistrationNumber(), result.getRegistrationNumber());
        assertEquals(postBusiness.getCountryId(), result.getCountryId());
    }
}
