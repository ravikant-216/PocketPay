package com.bootcamp107.business.service.service.country;

import com.bootcamp107.business.service.dto.GetCountry;
import com.bootcamp107.business.service.repository.CountryRepository;
import com.bootcamp107.business.service.entity.Country;
import com.bootcamp107.business.service.mapper.CountryMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CountryServiceImpl implements ICountryService {

    @Autowired
    private CountryMapper countryMapper;
    @Autowired
    private CountryRepository countryRepository;

    @Override
    public List<GetCountry> getAll() {
        List<Country> list = countryRepository.findAll();
        return list.stream().map(country -> countryMapper.convertEntityToDto(country)).collect(Collectors.toList());
    }
}
