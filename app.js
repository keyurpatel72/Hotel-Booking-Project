const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const app = express();

mongoose.connect('mongodb://localhost:27017/', {
        dbName: 'hotelbookdb',

        useUnifiedtopology: true
    },
    (err) => (err ? console.log(err) :
        console.log('hotelbookdb is connected')),
);

//schema 
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    roomNo: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const RoomBooked = mongoose.model('user', UserSchema);
RoomBooked.createIndexes();


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('app is working');
});

//register data
app.post('/register', async (req, res) => {
    try {
        const user = new RoomBooked(req.body);
        let result = await user.save();
        result = result.tooObject();
        if (result) {
            delete result.password;
            res.send(req.body);
            console.log(result);
        } else {
            console.log('something went wrong');
        }
    } catch (e) {
        res.send('user are register');
    }
});

//geting data
app.get('/get-data', async (req, res) => {
    try {
        const details = await RoomBooked.find({});
        res.send(details);
    } catch (error) {
        console.log(error);
    }
});

//server

app.listen(3000, () => {
    console.log('server running on port 3000');
});