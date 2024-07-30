import { Box, Typography } from "@mui/material";
import NewToDoForm from "../components/NewToDoForm";
import Sidebar from "../components/Sidebar";
import ToDoList from "../components/ToDoList";
import { useState } from "react";

export default function Dashboard({user}) {
    const [category, setCategory] = useState('All Tasks');

    const selectCategory = (category) => {        
        setCategory(category);        
    }

    return (
        <Box sx={{display: 'flex'}}>
            <Sidebar user={user} category={category} selectCategory={selectCategory}/>
            <Box sx={{flexGrow: 1}}>
                <Box sx={{                          
                    width: '80%',
                    margin: 'auto',
                    marginTop: 5,
                    bgcolor: 'background.paper'
                }}>
                    <Typography sx={{marginBottom: 4}} variant='h3'>{category}</Typography>
                    <NewToDoForm user={user} category={category}/>
                    <ToDoList user={user} category={category}/>
                </Box>
            </Box>
        </Box>
    );
}