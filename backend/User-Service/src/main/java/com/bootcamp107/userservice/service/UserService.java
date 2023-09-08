package com.bootcamp107.userservice.service;

import com.bootcamp107.userservice.dto.TokenDTO;
import com.bootcamp107.userservice.dto.request.LoginRequest;
import com.bootcamp107.userservice.dto.request.UserRequest;
import com.bootcamp107.userservice.dto.response.UserResponse;
import com.bootcamp107.userservice.entity.User;
import com.bootcamp107.userservice.exception.UserConflictException;
import com.bootcamp107.userservice.exception.UserNotFoundException;
import com.bootcamp107.userservice.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class UserService implements IUserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void signUp(UserRequest newUserDto) {
        Optional<User> user = userRepository.findByEmail(newUserDto.getEmail());
        if(user.isPresent()) {
            throw new UserConflictException("User already exists with email: '" + newUserDto.getEmail() + "'");
        }
        newUserDto.setPassword(passwordEncoder.encode(newUserDto.getPassword()));
        userRepository.save(modelMapper.map(newUserDto, User.class));
    }

    @Override
    public UserResponse getUserById(UUID userId) {
        User userFound = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User not found with id: '" + userId + "'"));
        return modelMapper.map(userFound, UserResponse.class);
    }

    @Override
    public UserResponse getUserByEmail(String email) {
        User userFound = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found with email: '" + email + "'"));
        return modelMapper.map(userFound, UserResponse.class);
    }

    @Override
    public TokenDTO loginUser(LoginRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(),
                        loginRequest.getPassword()
                )
        );
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return new TokenDTO(jwtToken);
    }
}
