const mongoose = require('mongoose');
require('dotenv').config();

const ATLAS_URI=process.env.ATLAS_URI;

const connectDB = async () => {
    await mongoose.connect(ATLAS_URI, {
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