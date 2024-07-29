package com.project.todoapp.service;

import com.project.todoapp.model.User;
import com.project.todoapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @SuppressWarnings("SpringJavaInjectionPointsAutowiringInspection")
    @Autowired
    UserRepository userRepository;

    @Override
    public User authenticateUser(String email, String password) {
        List<User> userList = userRepository.findByEmailAndPassword(email, password);
        if(!userList.isEmpty())
            return userList.getFirst();
        return null;
    }

    @Override
    public boolean addUser(User u) {
        if(userRepository.findByEmail(u.getEmail()).isEmpty()) {
            userRepository.save(u);
            return true;
        }
        return false;
    }
}
