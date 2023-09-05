package com.bootcamp107.userservice.exception;

import com.bootcamp107.userservice.dto.response.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
@Slf4j
public class UserServiceExceptionHandler {

    @ExceptionHandler(UserConflictException.class)
    public ResponseEntity<ApiResponse> handleConflictException(UserConflictException exception) {
        log.error(exception.getMessage());
        return new ResponseEntity<>(new ApiResponse(HttpStatus.CONFLICT.value(), exception.getMessage()), HttpStatus.CONFLICT);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse> handleNotFoundException(UserNotFoundException exception) {
        log.error(exception.getMessage());
        return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND.value(), exception.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse> handleException(Exception exception) {
        log.error(exception.getMessage());
        return new ResponseEntity<>(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), exception.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
