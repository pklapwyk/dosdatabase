//Requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser')

//Bring in Models
let gameData = require('./models/model.js');
let addGames = require('./models/add_game.js');

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

//Get Game List Page
app.get('/game_list', (req, res) => {
    gameData.findOne({}, function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('game_list', {
                gameData: gameSchema
            })    
        }
    })  
}); 

//Get Game Page By Mongo ID
app.get('/games/:id', function(req, res){
    gameData.findOne({_id: req.params.id}, function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('games', {
                gameData: gameSchema
            })
        }
    })
});

//Add Game Form/Page
app.get('/add_game', function(req, res){
    res.render('add_game')
})
app.post('/add_game', function(req, res){
    let game = new addGames();
    game.title = req.body.title;
    game.genre = req.body.genre;
    game.publisher = req.body.genre;
    game.developer = req.body.developer;
    game.yearPublished = req.body.yearPublished;
    game.description = req.body.description
    
    game.save(function(err){
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/submitted');
        }
    })
})
// Add Game Submitted page
app.get('/submitted', function(req, res){
    res.render('submitted')
})

//ID list page
app.get('/idList', (req, res) => {
    gameData.find().sort({"title" : 1}).exec(function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('idList', {
                gameData: gameSchema
            })    
        }
    })
});

//List Games Alphabetically
app.get('/alphabetical', (req, res) => {
    gameData.find().sort({"title" : 1}).exec(function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('alphabetical', {
                gameData: gameSchema
            })    
        }
    })  
});

//List Games By Year Published
app.get('/yearPublished', (req, res) => {
    gameData.find().sort({"yearPublished" : 1 , "title" : 1}).exec(function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('year_published', {
                gameData: gameSchema
            })    
        }
    })  
});

//Pagination
app.get('/pagination', function(req, res){
    res.render('pagination')
});

//About Page
app.get('/about', function(req, res){
    res.render('about')
});

//Listen on port 3000
app.listen(3000, function(){
    console.log('Server is started on port 3000...')
});