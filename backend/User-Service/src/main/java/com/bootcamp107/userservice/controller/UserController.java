package com.bootcamp107.userservice.controller;

import com.bootcamp107.userservice.dto.response.UserResponse;
import com.bootcamp107.userservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

import static com.bootcamp107.userservice.utils.AppConstants.USER_SERVICE_ENDPOINT;

@RestController
@RequestMapping(USER_SERVICE_ENDPOINT)
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{userId}")
    @ResponseStatus(HttpStatus.FOUND)
    public UserResponse getUserById(@PathVariable(name = "userId") UUID userId) {
        log.info("GET /api/v1/users getUserById() - userId: '" + userId + "'");
        return userService.getUserById(userId);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.FOUND)
    public UserResponse getUserByEmail(@RequestParam(name = "email") String email) {
        log.info("GET /api/v1/users getUserByEmail() - email: '" + email + "'");
        return userService.getUserByEmail(email);
    }
}
