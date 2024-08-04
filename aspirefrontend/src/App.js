import React, { useState } from 'react';
import Box from '@mui/material/Box';
import AppBarComponent from './features/AppBar/AppBarComponent'; // Assuming the file path
import HomeContent from './features/Home/HomeContent'; // Replace with your actual component imports
import UsersContent from './features/UsersContent/UsersContent'; // Replace with your actual component imports
import UsersDatabase from './features/UsersDatabase/UsersDatabase';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';



const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Home'); // Initial selection

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  return (
    <Router>
    <Box sx = {{ 
      backgroundColor: '#F4F4F4',
      backgroundImage: `url(https://www.aspiresoftware.com/wp-content/uploads/2022/09/Web-1920-%E2%80%93-1-1.png)`,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat',
  overflowY: 'auto',
  height: '100vh',
  px: 25,
  }}>
      <AppBarComponent
        isLoggedIn={isLoggedIn}
        selectedOption={selectedOption}
        onOptionClick={handleOptionClick}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />  
      <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/createUser" element={<UsersContent />} /> 
          <Route path="/usersDatabase" element={<UsersDatabase/>} />
        </Routes>
    
    </Box>
    </Router>
  );
};

export default App;
