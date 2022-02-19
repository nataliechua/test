const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();
app.use(cors({
    origin: '*'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
    const email = req.body.email;
    const password = req.body.password;

    const user = {
        email,
        password
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