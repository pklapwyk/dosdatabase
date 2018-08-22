//Requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const router = express.Router();


//Favicon
app.use('/favicon.ico', express.static('./favicon.ico'));

//Bring in Models
let gameData = require('./models/gameData.js');
let addGames = require('./models/addGames.js');

let publishers = require('./models/publishers.js');
let developers = require('./models/developers.js');

// View Engine Pug
app.set('view engine', 'pug');

// Set Public Folder
app.use(express.static('public'));

//Connect to Mongo Database
mongoose.connect('mongodb://localhost/dosgames');

//Check Mongo connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database')
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Get Homepage
app.get('/', function(req, res){
    gameData.findOne({}, function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('homepage', {
                gameData: gameSchema
            })    
        }
    })
})

//About Page
app.get('/about', function(req, res){
    res.render('about')
});

// Route files
let games = require('./routes/games');
app.use('/games', games);



//Listen on port 3000
app.listen(3000, function(){
    console.log('Server is started on port 3000...')
});