package com.login.service;

import com.login.model.User;

public interface UserService {
    User findByUsername(String username);
    User save(User user);
    boolean verifyUserCredentials(String username, String password);
}