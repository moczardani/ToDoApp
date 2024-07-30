import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box, Button, TextField } from '@mui/material';

export default function NewToDoForm({user, category}) {
    const [name, setName] = React.useState('');
    const [priority, setPriority] = React.useState('');

    const nameHandleChange = (event) => {
        setName(event.target.value);
    };

    const priorityHandleChange = (event) => {
        setPriority(event.target.value);
    };

    const addToDo = () => {    
        const json = {
            name: name,
            priority: priority,
            done: false,
            category: category,
            userId: user.id
        };

        const options = {
            method: 'POST',      
            headers: {
                'Content-Type': 'application/json',
              }, 
            body: JSON.stringify(json)
        };

        fetch('http://localhost:8080/addtodo', options)
        .catch(error => console.error(error));      
    };

    return (
        <Box sx={{            
            display: 'flex',
            justifyContent: 'space-between',
            gap: '10px'
        }}>
            <TextField sx={{
                width: '100%'
            }}
                id="name"
                label="ToDo Name"
                variant="outlined"
                onChange={nameHandleChange}
            />
            <FormControl sx={{ minWidth: 110 }}>
                <InputLabel id="priority-select-label">Priority</InputLabel>
                <Select
                    labelId="priority-select-label"
                    id="priority-select"
                    value={priority}
                    onChange={priorityHandleChange}
                    autoWidth
                    label="Priority"
                    required
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={"Low"}>Low</MenuItem>
                <MenuItem value={"Medium"}>Medium</MenuItem>
                <MenuItem value={"High"}>High</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant="contained"
                color="success"
                onClick={addToDo}
                disabled={name === '' || priority === ''}
            >
                Add
            </Button>
        </Box>
    );
}