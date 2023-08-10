const express = require('express')
const app = express()

/**
 * Basic way to handle routings
 */
app.get('/', (req, res) => {
  res.send('Poopsd!')
})

/**
 * This code is setting up a web server to listen on
 * port 3000 and when it's successfully running, 
 * it logs a message to the console indicating that the
 * application is running on that port.
 */
app.listen(3000, () => {
	console.log('App is running on port 3000')
})