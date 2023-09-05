package com.bootcamp107.userservice.service;

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

import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;
    @Mock
    private ModelMapper modelMapper;
    @InjectMocks
    private UserService userService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void givenUserRequest_whenUserNotExists_thenCreateNewUser() {
        // given
        String password = "password";
        UserRequest userRequest = new UserRequest();
        userRequest.setPassword(password);
        userRequest.setEmail("user@example.com");

        User user = new User();

        // when
        when(userRepository.findByEmail(userRequest.getEmail())).thenReturn(Optional.empty());
        when(modelMapper.map(userRequest, User.class)).thenReturn(user);
        when(userRepository.save(user)).thenReturn(user);

        userService.createUser(userRequest);

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
        assertThrows(UserConflictException.class, () -> userService.createUser(userRequest));
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

    private UserRequest getUserRequest() {
        String password = "password";
        UserRequest userRequest = new UserRequest();
        userRequest.setPassword(password);
        userRequest.setEmail("user@example.com");
        return userRequest;
    }
}