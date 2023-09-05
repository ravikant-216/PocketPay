package com.bootcamp107.userservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String email;
    private String password;
    private String firstName;
    private String lastName;
    private Date dateOfBirth;
    private String accountType;
    private String address;
}
