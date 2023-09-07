package com.bootcamp107.business.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetBusiness {

    private UUID id;
    private String registrationNumber;
    private String registrationAddress;
    private String name;
    private String tradingAddress;
    private int businessCategoryId;
    private int countryId;
    private UUID ownerId;
}
