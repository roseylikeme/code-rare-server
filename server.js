const express = require('express')
const mongoose = require('mongoose');
const app = express()
require('dotenv').config()

/**
 * Basic way to handle routings
 */
app.get('/', (req, res) => {
  res.send('Poopsd!')
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