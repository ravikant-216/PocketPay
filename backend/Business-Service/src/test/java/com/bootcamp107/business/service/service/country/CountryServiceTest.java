package com.bootcamp107.business.service.service.country;

import com.bootcamp107.business.service.dto.GetCountry;
import com.bootcamp107.business.service.entity.Country;
import com.bootcamp107.business.service.mapper.CountryMapper;
import com.bootcamp107.business.service.repository.CountryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.List;
import static org.mockito.Mockito.when;
import org.assertj.core.api.Assertions;


class CountryServiceTest {
    @Mock
    private CountryMapper countryMapper;

    @Mock
    private CountryRepository countryRepository;

    @InjectMocks
    private CountryServiceImpl countryService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    private Country createCountryMock(int id, String currencyCode, String countryCode, int currencyRate, String countryImageUrl) {
        return new Country(id, currencyCode, countryCode, currencyRate, countryImageUrl);
    }

    private GetCountry getCountry(int id, String currencyCode, String countryCode, int currencyRate, String countryImageUrl) {
        return new GetCountry(id, countryImageUrl, currencyCode, countryCode, currencyRate);
    }

    @Test
    void getAll() {

        Country country1 = createCountryMock(1, "USD", "+135", 12, "dummyUrl1");
        Country country2 = createCountryMock(2, "EUR", "+4", 15, "dummyUrl2");
        Country country3 = createCountryMock(2, "India", "+91", 1, "dummyUrl2");
        List<Country> mockCountryList = Arrays.asList(country1, country2,country3);
        when(countryRepository.findAll()).thenReturn(mockCountryList);
        GetCountry getCountry1 = getCountry(1, "USD", "+135", 12, "dummyUrl1");
        GetCountry getCountry2 = getCountry(2, "EUR", "+4", 15, "dummyUrl2");
        GetCountry getCountry3 = getCountry(2, "India", "+91", 1, "dummyUrl2");
        when(countryMapper.convertEntityToDto(country1)).thenReturn(getCountry1);
        when(countryMapper.convertEntityToDto(country2)).thenReturn(getCountry2);
        when(countryMapper.convertEntityToDto(country3)).thenReturn(getCountry3);
        List<GetCountry> result = countryService.getAll();
        Assertions.assertThat(result)
                .hasSize(3)
                .containsExactlyInAnyOrder(getCountry1, getCountry2,getCountry3);
    }
}
