package com.bootcamp107.userservice.service;

import com.bootcamp107.userservice.dto.TokenDTO;
import com.bootcamp107.userservice.dto.request.LoginRequest;
import com.bootcamp107.userservice.dto.request.UserRequest;
import com.bootcamp107.userservice.dto.response.UserResponse;

import java.util.UUID;

public interface IUserService {
    void signUp(UserRequest newUserDto);
    UserResponse getUserById(UUID userId);
    UserResponse getUserByEmail(String email);
    TokenDTO loginUser(LoginRequest loginRequest);

}
