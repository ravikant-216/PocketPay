package com.bootcamp107.userservice.service;

import com.bootcamp107.userservice.dto.request.UserRequest;
import com.bootcamp107.userservice.dto.response.UserResponse;

import java.util.UUID;

public interface IUserService {
    void createUser(UserRequest newUserDto);
    UserResponse getUserById(UUID userId);
    UserResponse getUserByEmail(String email);
}
