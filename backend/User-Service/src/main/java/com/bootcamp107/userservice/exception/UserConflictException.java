package com.bootcamp107.userservice.exception;

public class UserConflictException extends RuntimeException {
    public UserConflictException(String message){
        super(message);
    }
}
