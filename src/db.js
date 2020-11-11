const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME=process.env.DB_NAME;

const connected=`mongodb://localhost:27017/upload-image`;

const connectDB = async () => {
    await mongoose.connect(connected, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
}
connectDB();


//.then(() => console.log('MongoDB Connected...'))
//.catch((err) => console.log(err))

const connection = mongoose.connection;

connection.once('open',()=>{
    console.log('Database connected');
});