import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';

function App() {   
  const [user, setUser] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8080/user", {
      method: "GET",      
    })
      .then((response) => response.json())
      .then((data) => {setUser(data)
      })
      .catch((error) => console.log(error));
  });

  return (
    <BrowserRouter>
      <Routes> 
        <Route index element={
          <PrivateRoute user={user}>
            <Dashboard user={user}/>
          </PrivateRoute>}/>                 
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;