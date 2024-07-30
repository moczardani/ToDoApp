package com.project.todoapp.controller;

import com.project.todoapp.model.ToDo;
import com.project.todoapp.service.ToDoService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ToDoController {

    @Autowired
    private ToDoService toDoService;

    @PostMapping("/addtodo")
    public void addToDo(@RequestBody ToDo t) {
        toDoService.addToDo(t);
    }

    @PostMapping("/todos")
    public List<ToDo> getToDos(@RequestBody String body) {
        JSONObject json = new JSONObject(body);
        return toDoService.getToDos(json.getLong("userId"));
    }

    @PostMapping("/deletetodo")
    public void deleteTodo(@RequestBody String body) {
        JSONObject json = new JSONObject(body);
        toDoService.deleteToDo(json.getLong("id"));
    }

    @PostMapping("/markasdone")
    public void markAsDone(@RequestBody String body) {
        JSONObject json = new JSONObject(body);
        toDoService.markAsDone(json.getLong("id"));
    }
}
