import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({ 
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true, 
  },
  phoneNumber: {
    type: String,
    required: true, 
  },
  company: {
    type: String,
    required: true, 
  },
  division: {
    type: String,
    required: true, 
  },
  startingDate: {
    type: String,
    required: true, 
  },
});

const User = mongoose.model('User', userSchema);

export default User;
