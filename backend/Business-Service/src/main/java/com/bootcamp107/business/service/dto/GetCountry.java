package com.bootcamp107.business.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetCountry {

    private int id;
    private String name;
    private String countryImageUrl;
    private String currencyCode;
    private String countryCode;
    private double currencyRate;
}