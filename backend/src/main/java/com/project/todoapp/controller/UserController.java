package com.project.todoapp.controller;

import com.project.todoapp.model.User;
import com.project.todoapp.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    private User loggedInUser;

    @PostMapping("/signup")
    public boolean addUser(@RequestBody String body) {
        JSONObject jo = new JSONObject(body);
        String firstName = jo.getString("firstName");
        String lastName = jo.getString("lastName");
        String email = jo.getString("email");
        String password = jo.getString("password");
        Boolean promotions = jo.getBoolean("promotions");
        User u = new User(firstName, lastName, email, password, promotions);
        return userService.addUser(u);
    }

    @PostMapping("/signin")
    public boolean authenticateUser(@RequestBody String body) {
        JSONObject jo = new JSONObject(body);
        String email = jo.getString("email");
        String password = jo.getString("password");
        loggedInUser = userService.authenticateUser(email, password);
        return loggedInUser != null;
    }

    @GetMapping("/logout")
    public void logoutUser() {
        loggedInUser = null;
    }

    @GetMapping("/user")
    public User getUser() {
        if(loggedInUser == null) {
            User u = new User("NA", "NA", "NA", "NA", false);
            u.setId((long) -1);
            return u;
        }
        return loggedInUser;
    }
}
