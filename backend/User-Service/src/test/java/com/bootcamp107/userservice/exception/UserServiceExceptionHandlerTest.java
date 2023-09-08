package com.bootcamp107.userservice.exception;

import com.bootcamp107.userservice.dto.response.ApiResponse;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.*;

class UserServiceExceptionHandlerTest {

    private UserServiceExceptionHandler handler = new UserServiceExceptionHandler();

    @Test
    void givenUserNotFoundException_thenReturnNotFoundStatus() {
        // given
        UserNotFoundException exception = new UserNotFoundException("user not found");
        ResponseEntity<ApiResponse> apiResponse = handler.handleNotFoundException(exception);
        assertEquals(HttpStatus.NOT_FOUND, apiResponse.getStatusCode());
        assertEquals("user not found", apiResponse.getBody().getMessage());
        assertEquals(HttpStatus.NOT_FOUND.value(), apiResponse.getBody().getStatus());
    }

    @Test
    void givenUserConflictException_thenReturnConflictStatus() {
        // given
        UserConflictException exception = new UserConflictException("user conflict");
        ResponseEntity<ApiResponse> apiResponse = handler.handleConflictException(exception);
        assertEquals(HttpStatus.CONFLICT, apiResponse.getStatusCode());
        assertEquals("user conflict", apiResponse.getBody().getMessage());
        assertEquals(HttpStatus.CONFLICT.value(), apiResponse.getBody().getStatus());
    }

    @Test
    void givenAnyException_thenReturnInternalServerErrorStatus() {
        // given
        RuntimeException exception = new RuntimeException("runtime exception");
        ResponseEntity<ApiResponse> apiResponse = handler.handleException(exception);
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, apiResponse.getStatusCode());
        assertEquals("runtime exception", apiResponse.getBody().getMessage());
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR.value(), apiResponse.getBody().getStatus());
    }

    @Test
    void givenAccessDeniedException_thenReturnForbiddenStatus() {
        // given
        AccessDeniedException exception = new AccessDeniedException("access denied");
        ResponseEntity<ApiResponse> apiResponse = handler.handleAccessDeniedException(exception);
        assertEquals(HttpStatus.FORBIDDEN, apiResponse.getStatusCode());
        assertEquals("access denied", apiResponse.getBody().getMessage());
        assertEquals(HttpStatus.FORBIDDEN.value(), apiResponse.getBody().getStatus());
    }
}