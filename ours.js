// JavaScript source code

//const express = require('express');
//const app = express();

//app.use((req, res, next) => {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//    next();
//});




//let answer = document.getElementById('tabl');
//console.log("koukou");

//fetch("http://localhost:3000/api/teddies")

//    .then(function (response) {
//        if (response.ok) {
//            response.json()
            
//                .then(function (teddies) {
//                    displayTeddies(teddies)
                    
//                });

//        }
//    })
//    .catch(function (err) {
//        alert(err);
//    });

//const displayTeddies = (x) => {
//    console.log(x);
//};



fetch("http://localhost:3000/api/teddies", {
    
    method: "GET",
    data: 'data',
    dataType: 'json',
    ContentType: 'application/json'

})
    .then((resp) => {
        return resp.json();
    })
    .then((user) => {
        console.log("bonjour Constance");
        console.log(user);
        
    })
    .catch((err) => {
        console.log("bonjour encore Constance");
        console.log(err)
    })