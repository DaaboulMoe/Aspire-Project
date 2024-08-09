import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.js'; 
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000; 



mongoose.connect('mongodb+srv://oratebot:RIaCn4lTXDDnX6XL@aspirebackend.d7glbau.mongodb.net/?retryWrites=true&w=majority&appName=aspirebackend', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Adjust the timeout to your preference
  connectTimeoutMS: 10000,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

  app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




