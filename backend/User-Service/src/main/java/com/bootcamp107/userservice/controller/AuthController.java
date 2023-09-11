package com.bootcamp107.userservice.controller;

import com.bootcamp107.userservice.dto.TokenDTO;
import com.bootcamp107.userservice.dto.request.LoginRequest;
import com.bootcamp107.userservice.dto.request.UserRequest;
import com.bootcamp107.userservice.dto.response.UserResponse;
import com.bootcamp107.userservice.service.IUserService;
import com.bootcamp107.userservice.service.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import static com.bootcamp107.userservice.utils.AppConstants.AUTH_SERVICE_ENDPOINT;

@RestController
@RequestMapping(AUTH_SERVICE_ENDPOINT)
@Slf4j
public class AuthController {

    @Autowired
    private IUserService userService;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/signup")
    @ResponseStatus(HttpStatus.CREATED)
    public UserResponse signUpUser(@RequestBody UserRequest userRequest) {
        log.info("SignUp New User .. : " + userRequest);
        return userService.signUp(userRequest);
    }

    @PostMapping("/login")
    @ResponseStatus(HttpStatus.OK)
    public TokenDTO loginUser(@RequestBody LoginRequest loginRequest) {
        log.info("Login User .. : " + loginRequest);
        return userService.loginUser(loginRequest);
    }

    @PostMapping("/validateToken")
    @ResponseStatus(HttpStatus.OK)
    public void validateToken(@RequestBody TokenDTO tokenRequest) {
        log.info("Validating token .. : " + tokenRequest);
        jwtService.validateToken(tokenRequest.getToken());
        log.info("Token in valid");
    }
}



