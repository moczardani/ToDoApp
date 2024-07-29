package com.project.todoapp.service;

import com.project.todoapp.model.ToDo;

import java.util.List;

public interface ToDoService {
    void addToDo(ToDo t);
    List<ToDo> getToDos(Long userId);
    void deleteToDo(Long id);
    void markAsDone(Long id);
}
