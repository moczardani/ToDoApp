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
            <Box sx={{
                flexGrow: 1,                
                width: '80%',
                maxWidth: '1200px',
                margin: 'auto',
                marginTop: '20px',
                bgcolor: 'background.paper' 
            }}>
                <Typography variant='h3'>{category}</Typography>
                <ToDoList user={user} category={category}/>
                <NewToDoForm user={user} category={category}/>
            </Box>
        </Box>
    );
}