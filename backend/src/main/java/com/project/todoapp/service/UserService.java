package com.project.todoapp.service;

import com.project.todoapp.model.User;

public interface UserService {
    User authenticateUser(String email, String password);
    boolean addUser(User u);
}
