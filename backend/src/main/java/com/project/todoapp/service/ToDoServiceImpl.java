package com.project.todoapp.service;

import com.project.todoapp.model.ToDo;
import com.project.todoapp.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoServiceImpl implements ToDoService{

    @Autowired
    ToDoRepository toDoRepository;

    @Override
    public void addToDo(ToDo t) {
        toDoRepository.save(t);
    }

    @Override
    public List<ToDo> getToDos(Long userId) {
        return toDoRepository.findByUserId(userId);
    }

    @Override
    public void deleteToDo(Long id) {
        ToDo t = toDoRepository.findById(id).orElse(null);
        if(t != null)
            toDoRepository.delete(t);
    }

    @Override
    public void markAsDone(Long id) {
        ToDo t = toDoRepository.findById(id).orElse(null);
        if(t != null) {
            t.setDone(true);
            toDoRepository.save(t);
        }
    }
}
