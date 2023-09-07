package com.bootcamp107.business.service.mapper;

import com.bootcamp107.business.service.dto.GetBusiness;
import com.bootcamp107.business.service.dto.PostBusiness;
import com.bootcamp107.business.service.entity.Business;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BusinessMapper {

    @Autowired
    private   ModelMapper modelMapper;

    public GetBusiness convertEntityToDto(Business business)
    {return  modelMapper.map(business, GetBusiness.class);}

    public Business convertDtoToEntity(PostBusiness businessDto)
    {
        return  modelMapper.map(businessDto,Business.class);
    }
}
