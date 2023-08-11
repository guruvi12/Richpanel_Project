import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';

//load variables
dotenv.config();

//start server
const app = express();

app.use(express.static("public"));
app.use(express.json());

//home route
app.get("/" , (req,res) => {
    res.sendFile("selected_plan.html",{root:"public"});
})

//success
app.get("/" , (req,res) => {
    res.sendFile("yearly_pricing.html",{root:"public"});
})

//cancel
app.get("/" , (req,res) => {
    res.sendFile("login.html",{root:"public"});
})

//stripe 
let stripeGateway = stripe(process.env.stripe_api);
let DOMAIN =process.env.DOMAIN;
app.post('/stripe-checkout', async (req,res) =>{
    const lineItems = req.body.items.map((item) =>{
        const unitAmount = parseInt(item.price.replace(/[^0-9.-]+/g, '') *100);
        console.log('item-price:', item.price);
        console.log('unitAmount:', unitAmount);
        return{
            price_data:{
                currency:'usd',
                product_data:{
                    name: item.title,
                },
                unit_amount: unitAmount,
            },
            quantity: item.quantity,
        };
    });
    console.log('lineItems:', lineItems);

// create checkout session
const session = await stripeGateway.checkout.sessions.create({
    payment_method_type: ['card'],
    mode: 'payment',
    success_url: '${DOMAIN}/success',
    cancel_url: '${DOMAIN}/cancel',
    line_items: lineItems,

//asking address in stripe checkout page
billing_address_collection: 'required',
});
res.json(session.url);
});

app.listen(3000,()=>{
    console.log("listening on port 3000;");
});












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