import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';

export default function ToDoList({user, category}) {
  const [toDoList, setToDoList] = React.useState([]);
  const priorityColors = {
    Low: 'blue',
    Medium: 'orange',
    High: 'red',
  }
  React.useEffect(() => {
    const json = {
      userid: user.id,
    };

    const options = {
      method: 'POST',      
      body: JSON.stringify(json)
    };

    fetch('http://localhost:8080/todos', options)
      .then(response => response.json())
      .then(response => {
        setToDoList(response);
      })
      .catch(error => console.error(error));
  });

  const handleDelete = (key) => {
    const json = {
      id: key,
    };

    const options = {
      method: 'POST',      
      body: JSON.stringify(json)
    };

    fetch('http://localhost:8080/deletetodo', options)      
      .catch(error => console.error(error));
  }

  const handleMarkAsDone = (key) => {
    const json = {
      id: key,
    };

    const options = {
      method: 'POST',      
      body: JSON.stringify(json)
    };

    fetch('http://localhost:8080/markasdone', options)      
      .catch(error => console.error(error));
  }

  return (    
    <List>
      {(category === 'All Tasks' ? toDoList : toDoList.filter(((todo) => todo.category === category))).map((todo) => (
        <ListItem
          key={todo.id}
          disableGutters
          secondaryAction={
            <>
              <IconButton aria-label="done" onClick={() => handleMarkAsDone(todo.id)} disabled={todo.done}>
                <DoneIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => handleDelete(todo.id)}>
                <DeleteIcon />
              </IconButton>
            </>
          }
          sx={{
            borderLeft: 4,            
            borderColor: todo.done ? 'lightgrey' : priorityColors[todo.priority],
            paddingLeft: 1,
            marginTop: 1
          }}
        >
          <ListItemText
            primary={todo.name}
            sx={{
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? 'grey' : 'black'
              }}/>
        </ListItem>
      ))}
    </List>
  );
}
