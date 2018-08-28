const express = require('express');
const router = express.Router();

//Bring in Models
let gameData = require('../models/gameData.js');
let addGames = require('../models/addGames.js');
let publishers = require('../models/publishers.js');
let developers = require('../models/developers.js');


//Add Game Form/Page
router.get('/add_game', function(req, res){
    res.render('add_game')
})
router.post('/add_game', function(req, res){
    let game = new gameData();
    game.title = req.body.title;
    game.genre = req.body.genre;
    game.publisher = req.body.publisher;
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
router.get('/submitted', function(req, res){
    res.render('submitted')
})

//ID list page
router.get('/idList', (req, res) => {
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
router.get('/alphabetical', (req, res) => {
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

//List Games Alphabetically
router.get('/genre', (req, res) => {
    gameData.find().sort({"title" : 1}).exec(function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('genre', {
                gameData: gameSchema
            })    
        }
    })  
});

//List Games By Year Published
router.get('/yearPublished', (req, res) => {
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

// Get Publishers List Page
router.get('/publishers', (req, res) => {
    publishers.find().sort({"name" : 1}).exec(function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('publishers', {
                publishers: gameSchema
            })    
        }
    })
});

//Get Developer List Page
router.get('/developers', (req, res) => {
    developers.find().sort({"name" : 1}).exec(function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('developers', {
                developers: gameSchema
            })    
        }
    })
});

//Get Game Page By Mongo ID
router.get('/:id', function(req, res){
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

//Pagination
router.get('/pagination', function(req, res){
    res.render('pagination')
});

module.exports = router;