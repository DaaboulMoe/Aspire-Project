import React, { useState } from 'react';
import { Button, Grid, TextField, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addUser, editUser } from './UsersContentSlice';
import User from '../../models/User'; // Update with your actual path
import { useNavigate } from 'react-router-dom';

const UsersContent = ({ editingUser }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(editingUser || {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    division: '',
    startingDate: new Date().toISOString().split('T')[0],
  }); 
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const user = new User(
        formData.id || Date.now().toString(),
        formData.firstName,
        formData.lastName,
        formData.email,
        `${formData.countryCode || ''}${formData.phoneNumber}`,
        formData.company,
        formData.division,
        formData.startingDate
      );
      if (editingUser) {
        dispatch(editUser(user));
      } else {
        dispatch(addUser(user));
      }
      navigate('/usersDatabase');
    }
  };

  const validateForm = () => {
    return (
      formData.firstName !== '' &&
      formData.lastName !== '' &&
      formData.email !== '' &&
      /\S+@\S+\.\S+/.test(formData.email) &&
      (!formData.phoneNumber || /^\+?[\d\s-]+$/.test(formData.phoneNumber))
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl required fullWidth>
            <InputLabel>Country Code</InputLabel>
            <Select
              name="countryCode"
              value={formData.countryCode || ''}
              onChange={handleInputChange}
            >
              <MenuItem value="+1">+1 (USA)</MenuItem>
              <MenuItem value="+961">+961 (LB)</MenuItem>
              <MenuItem value="+91">+91 (India)</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="company"
            label="Company"
            value={formData.company}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel>Division</InputLabel>
            <Select
              name="division"
              value={formData.division || ''}
              onChange={handleInputChange}
            >
              <MenuItem value="IT Support">IT Support</MenuItem>
              <MenuItem value="Dev Support/IT">Dev Support/IT</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="startingDate"
            label="Starting Date"
            type="date"
            value={formData.startingDate}
            onChange={handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            sx={{
              color: "white",
              fontSize: "20px",
              backgroundColor: "#00A9B8",
              borderRadius: "15px",
              marginLeft: '5px',
              textTransform: 'uppercase',
            }}
          >
            {editingUser ? 'Update User' : 'Add User'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default UsersContent;
