import models from './models/index.js';
import { v4 as uuidv4 } from 'uuid';
import express from 'express'
import mongoose from 'mongoose'
const app = express()
import 'dotenv/config'

// app use
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// MIDDLEWARE
app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// ROUTES
app.get('/session', (req, res) => {
  return res.send(users[req.me.id]);
});
app.get('/users', (req, res) => {
  return res.send(Object.values(req.context.models.users));
});

app.get('/users/:userId', (req, res) => {
  return res.send(req.context.models.users[req.params.userId]);
});

app.get('/messages', (req, res) => {
  return res.send(Object.values(req.context.models.messages));
});

app.get('/messages/:messageId', (req, res) => {
  return res.send(req.context.models.messages[req.params.messageId]);
});

app.post('/messages', (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

app.delete('/messages/:messageId', (req, res) => {
  const {
    [req.params.messageId]: message,
    ...otherMessages
  } = req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

// MONGODB CONNECTION
mongoose
.connect(process.env.MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB')
    /**
     * This code is setting up a web server to listen on
     * port 3000 and when it's successfully running, 
     * it logs a message to the console indicating that the
     * application is running on that port.
     */
    app.listen(process.env.PORT, () => {
        console.log(`App is running on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(err)
})