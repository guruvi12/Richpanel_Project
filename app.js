const express = require('express');
const app =  express();
const cars = require('cars');
const dotenv = require('dotenv');
dotenv.config();

app.use(cars());
app.use(express.urlencoded({extended:false}));

//create
app.post('/insert', (request,response) =>{

});

//read
app.get('/getAll',(req,res) =>{
    console.log('test');
});

//update


//delete
app.listen(process.env.PORT,() => consolole.log('app is running'));