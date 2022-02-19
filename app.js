const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Protected route
app.post('/api/user', verifyToken, (req, res) => {  
    jwt.verify(req.token, 'secretkey', (err, authData) => {
      if(err) {
        res.sendStatus(403);
      } else {
        res.json({
          authData
        });
      }
    });
  });

// Get token (Login route)
app.post('/api/login', (req,res)=>{

    // Authentication code goes here

    const user = {
        fname: 'Jeff',
        lname: 'Bezos',
        email: 'jeffbezos@gmail.com',
        password: 'ieatchildren',
        phone: '999'
    };
    
    jwt.sign({user}, 'secretkey', (err,token)=>{
        res.json({
            token
        })
    });
})

function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if(typeof bearerHeader !== 'undefined') {
      // Split at the space
      const bearer = bearerHeader.split(' ');
      // Get token from array
      const bearerToken = bearer[1];
      // Set the token
      req.token = bearerToken;
    //   console.log(req.token)
      // Next middleware
      next();
    } else {
      // Forbidden
      res.sendStatus(403);
    }
};

app.listen(5000);