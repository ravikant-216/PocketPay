package com.bootcamp107.userservice.service;

import com.bootcamp107.userservice.dto.TokenDTO;
import com.bootcamp107.userservice.dto.request.LoginRequest;
import com.bootcamp107.userservice.dto.request.UserRequest;
import com.bootcamp107.userservice.dto.response.UserResponse;
import com.bootcamp107.userservice.entity.User;
import com.bootcamp107.userservice.exception.UserConflictException;
import com.bootcamp107.userservice.exception.UserNotFoundException;
import com.bootcamp107.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.modelmapper.ModelMapper;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private ModelMapper modelMapper;
    @Mock
    private JwtService jwtService;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private AuthenticationManager authenticationManager;
    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void givenUserRequest_whenUserNotExists_thenCreateNewUserAndGenerateToken() {
        // given
        String password = "password";
        UserRequest userRequest = new UserRequest();
        userRequest.setPassword(password);
        userRequest.setEmail("user@example.com");

        User user = getUserDetails();

        // when
        when(userRepository.findByEmail(userRequest.getEmail())).thenReturn(Optional.empty());
        when(modelMapper.map(userRequest, User.class)).thenReturn(user);
        when(jwtService.generateToken(user)).thenReturn("token1233");
        when(passwordEncoder.encode(any())).thenReturn("1234");
        when(userRepository.save(user)).thenReturn(user);

        userService.signUp(userRequest);

        // verify
        verify(modelMapper).map(userRequest, User.class);
        verify(userRepository).save(user);
    }

    @Test
    void givenUserRequest_whenUserExists_thenThrowUserConflictException() {
        // given
        UserRequest userRequest = getUserRequest();
        User user = new User();

        // when
        when(userRepository.findByEmail(userRequest.getEmail())).thenReturn(Optional.of(user));

        // verify
        assertThrows(UserConflictException.class, () -> userService.signUp(userRequest));
        verify(modelMapper, never()).map(userRequest, User.class);
        verify(userRepository, never()).save(user);
    }

    @Test
    void givenUserId_whenUserNotExists_thenThrowUserNotFoundException() {
        // given
        final UUID id = UUID.randomUUID();

        // when
        when(userRepository.findById(id)).thenReturn(Optional.empty());

        // verify
        assertThrows(UserNotFoundException.class, () -> userService.getUserById(id));
    }

    @Test
    void givenUserId_whenUserExists_thenReturnUser() {

        final UUID id = UUID.randomUUID();
        User user = new User();
        UserResponse expectedUserResponse = new UserResponse();

        // when
        when(userRepository.findById(id)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserResponse.class)).thenReturn(expectedUserResponse);

        UserResponse actualUserResponse = userService.getUserById(id);

        // verify
        assertEquals(expectedUserResponse, actualUserResponse);
    }

    @Test
    void givenUserEmail_whenUserExists_thenReturnUser() {

        final String email = "user@example.com";
        User user = new User();
        UserResponse expectedUserResponse = new UserResponse();

        // when
        when(userRepository.findByEmail(email)).thenReturn(Optional.of(user));
        when(modelMapper.map(user, UserResponse.class)).thenReturn(expectedUserResponse);

        UserResponse actualUserResponse = userService.getUserByEmail(email);

        // verify
        assertEquals(expectedUserResponse, actualUserResponse);
    }

    @Test
    void givenUserEmail_whenUserNotExists_thenThrowUserNotFoundException() {

        /// given
        final String email = "user@example.com";

        // when
        when(userRepository.findByEmail(email)).thenReturn(Optional.empty());

        // verify
        assertThrows(UserNotFoundException.class, () -> userService.getUserByEmail(email));
        verify(userRepository).findByEmail(email);
    }

    @Test
    void testLoginUser() {
        // Mock the login request
        LoginRequest loginRequest = new LoginRequest("test@example.com", "password");

        // Mock the user entity that would be returned from the repository
        User user = new User();
        user.setId(UUID.randomUUID());
        user.setEmail("test@example.com");
        user.setPassword(passwordEncoder.encode("password")); // Assuming you're using a password encoder

        // Mock the authentication result
        Authentication authentication = new UsernamePasswordAuthenticationToken(user, null);
        when(authenticationManager.authenticate(any(Authentication.class))).thenReturn(authentication);

        // Mock the JWT token generation
        when(jwtService.generateToken(user)).thenReturn("mocked-jwt-token");

        // Mock the UserRepository behavior
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(user));

        // Call the loginUser method
        TokenDTO result = userService.loginUser(loginRequest);

        // Verify that the authentication manager was called with the correct credentials
        verify(authenticationManager).authenticate(any(Authentication.class));

        // Verify that the JWT service was called to generate a token
        verify(jwtService).generateToken(user);

        // Verify that the expected token was returned
        assertEquals("mocked-jwt-token", result.getToken());
    }

    private UserRequest getUserRequest() {
        String password = "password";
        UserRequest userRequest = new UserRequest();
        userRequest.setPassword(password);
        userRequest.setEmail("user@example.com");
        return userRequest;
    }

    private User getUserDetails() {
        User user = User.builder()
                .id(UUID.randomUUID())
                .email("test_user")
                .address("address")
                .accountType("checking")
                .password(passwordEncoder.encode("password"))
                .firstName("firstName")
                .lastName("lastName")
                .build();
        return user;
    }
}