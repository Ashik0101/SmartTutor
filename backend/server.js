const express = require('express');
const { connection } = require('./configs/connection');
const { userRoute } = require('./route/userRoute.route');
const { teacherRoute } = require('./route/teacherRoute.route');

require('dotenv').config();



const app = express();
app.use(express.json());


app.get('/',(req,res)=>{
    res.send('Welcome to SkillSphere!');
})


app.use('/users',userRoute);
app.use('/teachers',teacherRoute);

app.listen(process.env.port,async()=>{
    try{
        await connection;
        console.log('Server is connected to the Database!');
    }catch(err){
        console.log('Could not connect to the server..');
    }
    console.log(`Server is running at the port ${process.env.port}`);
})