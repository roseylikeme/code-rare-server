const { parse } = require("dotenv");
const User = require("../models/user.model");

const userController = {
    getUsers: async function(req, res){
        let query = {}
        let limit = parseInt(req.query.limit)  || 100
        let skip = parseInt(req.query.offset) || 0

        try {
            let allUsers = await User.find(query, {_id: 0, __v: 0}).limit(limit).skip(skip)

            res.json(allUsers)
        } catch (err) {
            console.log("errror getting all users: " + err)
            res.status(400).json({
                message: err.message,
                statusCode: res.statusCode
            })
        }
    },
    // method to create a new user
    createUser: async function(req, res){
        try{
            // store user data from request body
            const userData = req.body;

            // pass the user data to the User model
            let newUser = await User.create(userData);

            // return the new user
            res.status(201).json(await User.findById(newUser._id, {_id: 0, __v: 0}));

        } catch (err) {
            console.log("failed to create user: " + err)
            res.status(400).json({
                message: err.message,
                statusCode: res.statusCode
            })
        }
    },
    // method to update a user
    updateUser: async function(req, res) {
        try {
            const username = req.params.username
            const newUserData = req.body

            // find user that matches username
            const user = await User.findOne({username: username})

            // if user not found return 404 otherwise update user data
            if(!user){
                res.status(404).send({message: "User not found", statusCode: res.statusCode})
            } else { 
                Object.assign(user, newUserData)
                await user.save()
            }
        } catch (err) {
            console.log("failed to update user: " + err)
            res.status(400).json({
                message: err.message,
                statusCode: res.statusCode
            })
        }
    },
    // method to get user
    getUser: async function(req, res){
        try {
            const username = req.params.username;
            let foundUser = await User.findOne({username: username}, {_id: 0, __v: 0})
            if(!foundUser){
                res.status(404).send({message: "User not found", statusCode: res.statusCode})
            } else {
                res.json(foundUser)
            }
        } catch (err) {
            console.log("failed to get user: " + err)
            res.status(400).json({
                message: err.message,
                statusCode: res.statusCode
            })
        }
    }
}

module.exports = userController;
   

