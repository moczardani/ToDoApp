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
    public void addToDo(@RequestBody String body) {
        JSONObject jo = new JSONObject(body);
        String name = jo.getString("name");
        String priority = jo.getString("priority");
        String category = jo.getString("category");
        Long userId = jo.getLong("userid");
        ToDo t = new ToDo(name, priority, false, category, userId);
        toDoService.addToDo(t);
    }

    @PostMapping("/todos")
    public List<ToDo> getToDos(@RequestBody String body) {
        JSONObject jo = new JSONObject(body);
        Long userId = jo.getLong("userid");
        return toDoService.getToDos(userId);
    }

    @PostMapping("/deletetodo")
    public void deleteTodo(@RequestBody String body) {
        JSONObject jo = new JSONObject(body);
        Long id = jo.getLong("id");
        toDoService.deleteToDo(id);
    }

    @PostMapping("/markasdone")
    public void markAsDone(@RequestBody String body) {
        JSONObject jo = new JSONObject(body);
        Long id = jo.getLong("id");
        toDoService.markAsDone(id);
    }
}
