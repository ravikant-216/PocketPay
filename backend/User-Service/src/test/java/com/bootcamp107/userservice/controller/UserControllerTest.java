package com.bootcamp107.userservice.controller;

import com.bootcamp107.userservice.dto.request.UserRequest;
import com.bootcamp107.userservice.dto.response.UserResponse;
import com.bootcamp107.userservice.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.UUID;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;

    @BeforeEach
    void setup() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
    }

    @Test
    void testCreateUser() throws Exception {
        UserRequest userRequest = new UserRequest();

        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(asJsonString(userRequest)))
                .andExpect(status().isCreated());
    }

    @Test
    void testGetUserById() throws Exception {
        UUID userId = UUID.randomUUID();
        UserResponse userResponse = new UserResponse();

        when(userService.getUserById(userId)).thenReturn(userResponse);

        mockMvc.perform(get("/api/v1/users/{userId}", userId))
                .andExpect(status().isFound())
                .andExpect(jsonPath("$.email").value(userResponse.getEmail()));
    }

    @Test
    void testGetUserByEmail() throws Exception {
        String email = "test@example.com";
        UserResponse userResponse = new UserResponse();

        when(userService.getUserByEmail(email)).thenReturn(userResponse);

        mockMvc.perform(get("/api/v1/users")
                        .param("email", email))
                .andExpect(status().isFound())
                .andExpect(jsonPath("$.email").value(userResponse.getEmail()));
    }

    private String asJsonString(Object object) throws Exception {
        return new ObjectMapper().writeValueAsString(object);
    }
}
