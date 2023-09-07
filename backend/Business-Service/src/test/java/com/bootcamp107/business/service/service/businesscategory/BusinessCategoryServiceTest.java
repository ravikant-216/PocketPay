package com.bootcamp107.business.service.service.businesscategory;

import com.bootcamp107.business.service.dto.GetBusinessCategory;
import com.bootcamp107.business.service.entity.BusinessCategory;
import com.bootcamp107.business.service.mapper.BusinessCategoryMapper;
import com.bootcamp107.business.service.repository.BusinessCategoryRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;

class BusinessCategoryServiceTest {
    @Mock
    private BusinessCategoryMapper businessCategoryMapper;

    @Mock
    private BusinessCategoryRepository businessCategoryRepository;

    @InjectMocks
    private BusinessCategoryServiceImpl businessCategoryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    private BusinessCategory createBusinessCategory(int id, String name) {
        BusinessCategory category = new BusinessCategory();
        category.setId(id);
        category.setName(name);
        return category;
    }

    private GetBusinessCategory getBusinessCategory(int id, String name) {
        GetBusinessCategory getBusinessCategory = new GetBusinessCategory();
        getBusinessCategory.setId(id);
        getBusinessCategory.setName(name);
        return getBusinessCategory;
    }

    @Test
    void getAll() {

        BusinessCategory category1 = createBusinessCategory(1, "Category 1");
        BusinessCategory category2 = createBusinessCategory(2, "Category 2");
        BusinessCategory category3 = createBusinessCategory(3, "Category 3");
        List<BusinessCategory> mockCategoryList = Arrays.asList(category1, category2,category3);
        when(businessCategoryRepository.findAll()).thenReturn(mockCategoryList);
        GetBusinessCategory getBusinessCategory1 = getBusinessCategory(1, "Category 1");
        GetBusinessCategory getBusinessCategory2 = getBusinessCategory(2, "Category 2");
        GetBusinessCategory getBusinessCategory3 = getBusinessCategory(3, "Category 3");
        when(businessCategoryMapper.convertEntityToDto(category1)).thenReturn(getBusinessCategory1);
        when(businessCategoryMapper.convertEntityToDto(category2)).thenReturn(getBusinessCategory2);
        when(businessCategoryMapper.convertEntityToDto(category3)).thenReturn(getBusinessCategory3);
        List<GetBusinessCategory> result = businessCategoryService.getAll();

        Assertions.assertThat(result)
                .hasSize(3)
                .containsExactlyInAnyOrder(getBusinessCategory1, getBusinessCategory2,getBusinessCategory3);
    }
}
