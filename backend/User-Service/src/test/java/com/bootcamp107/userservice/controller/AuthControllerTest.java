package com.bootcamp107.userservice.controller;

import com.bootcamp107.userservice.dto.TokenDTO;
import com.bootcamp107.userservice.dto.request.LoginRequest;
import com.bootcamp107.userservice.dto.request.UserRequest;
import com.bootcamp107.userservice.dto.response.UserResponse;
import com.bootcamp107.userservice.service.IUserService;
import com.bootcamp107.userservice.service.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Date;
import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class AuthControllerTest {

    private MockMvc mockMvc;

    @Mock
    private IUserService userService;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthController authController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(authController).build();
    }

    @Test
    void testSignUpUser() throws Exception {
        UserRequest userRequest = new UserRequest("email", "password", "firstName", "lastname", new Date(),"accountType", "address");
        TokenDTO tokenDTO = new TokenDTO("token");
        UserResponse userResponse = new UserResponse(UUID.randomUUID(), "email", "firstName", "lastname", new Date(),"accountType", "address");

        when(userService.signUp(userRequest)).thenReturn(userResponse);

        mockMvc.perform(post("/api/v1/auth/signup")
                        .contentType("application/json")
                        .content(asJsonString(userRequest)))
                        .andExpect(status().isCreated());

        verify(userService, times(1)).signUp(userRequest);
    }

    @Test
    void testLoginUser() throws Exception {
        LoginRequest loginRequest = new LoginRequest("email", "password");
        TokenDTO tokenDTO = new TokenDTO("token");

        when(userService.loginUser(loginRequest)).thenReturn(tokenDTO);

        mockMvc.perform(post("/api/v1/auth/login")
                        .contentType("application/json")
                        .content(asJsonString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value(tokenDTO.getToken()));

        verify(userService, times(1)).loginUser(loginRequest);
    }

    @Test
    void testValidateToken() throws Exception {
        TokenDTO tokenDTO = new TokenDTO("token");

        mockMvc.perform(post("/api/v1/auth/validateToken")
                        .contentType("application/json")
                        .content(asJsonString(new TokenDTO("token"))))
                .andExpect(status().isOk())
                .andDo(print());

        verify(jwtService, times(1)).validateToken(tokenDTO.getToken());
    }


    private String asJsonString(Object object) throws Exception {
        return new ObjectMapper().writeValueAsString(object);
    }
}
