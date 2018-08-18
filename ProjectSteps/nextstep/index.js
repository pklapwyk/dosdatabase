//Requirements
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Bring in Models
let gameData = require('./models/model.js');

// View Engine Pug
app.set('view engine', 'pug');

//Connect to Mongo Database
mongoose.connect('mongodb://localhost/dosdatabase');

//Checkin Mongo connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database')
});

//Get Homepage
app.get('/', function(req, res){
    gameData.findOne({}, function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('index', {
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
//Listen on port 3000
app.listen(3000, function(){
    console.log('Server is started on port 3000...')
})