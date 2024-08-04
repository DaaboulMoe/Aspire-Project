import EditIcon from '@mui/icons-material/Edit';
import React, { useState, useEffect } from 'react';
import { Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'; 
import { useSelector, useDispatch } from 'react-redux';
import { editUser, fetchUsers } from '../UsersContent/UsersContentSlice';

const UsersDatabase = ({ editingUser }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.usersContent);
  const [openDialog, setOpenDialog] = useState(false);

  const [EditingUser, setEditingUser] = useState(editingUser || {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    company: '',
    division: '',
    startingDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => { 
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEditClick = (user) => {
    setEditingUser(user);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prevData => ({ ...prevData, [name]: value }));
  };

  const handleEditSubmit = () => {
    dispatch(editUser(EditingUser))
      .then(() => {
        dispatch(fetchUsers());
        handleCloseDialog();
      })
      .catch(error => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <div>
      <h1>Users List</h1>
      <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 0 5px rgba(0, 0, 0, .1)', borderRadius: '20px', marginBottom: '50px' }}>
        <thead style={{ textAlign: 'left', backgroundColor: '#f0f0f0', borderBottom: '1px solid #ccc' }}>
          <tr>
            <th style={{ padding: '10px', paddingLeft: '15px' }}>Name</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Phone Number</th>
            <th style={{ padding: '10px' }}>Company</th>
            <th style={{ padding: '10px' }}>Division</th>
            <th style={{ padding: '10px' }}>Starting Date</th>
            <th style={{ padding: '10px' }}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #eee', backgroundColor: 'white' }}>
              <td style={{ padding: '10px', paddingLeft: '15px' }}>{user.firstName} {user.lastName}</td>
              <td style={{ padding: '10px' }}>{user.email}</td>
              <td style={{ padding: '10px' }}>{user.phoneNumber}</td>
              <td style={{ padding: '10px' }}>{user.company}</td>
              <td style={{ padding: '10px' }}>{user.division}</td>
              <td style={{ padding: '10px' }}>{user.startingDate}</td>
              <td style={{ padding: '10px' }}>
                <IconButton size="small" onClick={() => handleEditClick(user)}>
                  <EditIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="firstName"
                label="First Name"
                sx={{ marginTop: 1 }}
                value={EditingUser.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="lastName"
                label="Last Name"
                sx={{ marginTop: 1 }}
                value={EditingUser.lastName}
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
                value={EditingUser.email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="phoneNumber"
                label="Phone Number"
                value={EditingUser.phoneNumber}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="company"
                label="Company"
                value={EditingUser.company}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Division</InputLabel>
                <Select
                  name="division"
                  value={EditingUser.division}
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
                value={EditingUser.startingDate}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UsersDatabase;
