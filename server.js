const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const cookieParser = require('cookie-parser')
const User = require('./models/user')
const app = express()
require('dotenv').config()

// app use
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(cookieParser())

app.get('/', (req, res) => {
  res.status(200).send('Welcome to CodeRARE API')
})

mongoose
.connect(`mongodb+srv://${process.env.username}:${process.env.password}@cluster0.7gwo185.mongodb.net/Node-API?retryWrites=true&w=majority`)
.then(() => {
    console.log('Connected to MongoDB')
    /**
     * This code is setting up a web server to listen on
     * port 3000 and when it's successfully running, 
     * it logs a message to the console indicating that the
     * application is running on that port.
     */
    app.listen(3000, () => {
        console.log('App is running on port 3000')
    })
})