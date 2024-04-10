require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Data = require('./Models/DataModel.js')
const cors = require('cors')
const bcrypt = require('bcrypt')
app.use(cors())
app.use(express.json())


const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL
const FRONTEND = process.env.FRONTEND

app.use(express.urlencoded({ extended: false }))


// route to access your server on a web browser
app.get('/', (request, response) => {
    response.send(`Server is Running ! ${PORT} and Connected to Database ! ${MONGO_URL}`);
})

// send data into the database to register user
app.post('/user', async (req, res) => {
    try {
        const newUser = await Data.create(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})

// send 
app.post( '/login', async (req, res)=>{
    const { username, password } = req.body;
    try {
        const user = await Data.findOne({username});
        if(!user) {
            return res.status(401).json({success: false, message: 'Incorrect Username or Password !'});
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return res.status(401).json({success: false, message: 'Incorrect Username or Password !'});
        }
        res.status(200).json({ success: true, message: 'Login successful' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// MongoDB connection       
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('connected to MongoDB !')
        app.listen(PORT, () => {
            console.log(`Node API app is running on port ${PORT}`)
        })
    }).catch((error) => {
        console.log(error)
    })

