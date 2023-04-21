import React from 'react';
import {  Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import Signup from './component/Signup';
import AddTodo from './component/AddTodo';

const App = () => {
  return (
    
      <div>
        <Routes>
          <Route  path="/" element={<Login/>} />
          <Route  path="/signup" element={<Signup/>} />
          <Route  path="/create" element={<AddTodo/>} />
          <Route  path="/edit/:id" element={<AddTodo/>} />
          
        
        </Routes>
      </div>
   
  );
};

export default App;
