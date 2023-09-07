package com.bootcamp107.business.service.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GetBusinessCategory {

    private int id;
    private String name;

}