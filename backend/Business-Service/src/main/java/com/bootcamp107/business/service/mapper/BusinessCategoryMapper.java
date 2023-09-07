package com.bootcamp107.business.service.mapper;

import com.bootcamp107.business.service.dto.GetBusinessCategory;
import com.bootcamp107.business.service.entity.BusinessCategory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BusinessCategoryMapper {
    @Autowired
    private ModelMapper modelMapper;

    public BusinessCategory convertDtoToEntity(GetBusinessCategory businessCategoryDto)
    {
        return modelMapper.map(businessCategoryDto,BusinessCategory.class);
    }

    public GetBusinessCategory convertEntityToDto(BusinessCategory businessCategory)
    {
        return modelMapper.map(businessCategory, GetBusinessCategory.class);
    }
}
