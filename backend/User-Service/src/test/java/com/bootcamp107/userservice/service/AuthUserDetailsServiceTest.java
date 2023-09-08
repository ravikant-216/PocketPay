package com.bootcamp107.userservice.service;

import com.bootcamp107.userservice.entity.User;
import com.bootcamp107.userservice.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

class AuthUserDetailsServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    AuthUserDetailsService service;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void givenUserEmail_thenLoadUserByUsername() {
        String username = "username";
        User user = new User();
        when(userRepository.findByEmail(username)).thenReturn(Optional.of(user));
        UserDetails gotUser = service.loadUserByUsername(username);

        assertEquals(user, gotUser);
    }

}