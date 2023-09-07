package com.bootcamp107.business.service.mapper;

import com.bootcamp107.business.service.dto.GetCountry;
import com.bootcamp107.business.service.entity.Country;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CountryMapper {

    @Autowired
    private ModelMapper modelMapper;

    public GetCountry convertEntityToDto(Country country ){
        return modelMapper.map(country, GetCountry.class);
    }

    public Country convertDtoToEntity(GetCountry countryDto)
    {
        return modelMapper.map(countryDto,Country.class);
    }
}