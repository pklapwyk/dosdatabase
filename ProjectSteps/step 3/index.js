//Requirements
const express = require('express');
const mongoose = require('mongoose');
const paginate = require('express-paginate')
const pug = require('pug')

const app = express();

//Bring in Models
let gameData = require('./models/model.js');

// View Engine Pug
app.set('view engine', 'pug');

// Pagination requirements
app.use(paginate.middleware(10, 50));

//Connect to Mongo Database
mongoose.connect('mongodb://localhost/dosdatabase');

//Check Mongo connection
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
            res.render('homepage', {
                gameData: gameSchema
            })    
        }
    })
})

//Get Game List Page
app.get('/game_list', async (req, res, next) => {
    try {
        const [results, itemCount] = await Promise.all([
            gameData.find({}).limit(req.query.limit).skip(req.skip).lean().exec(),
            gameData.count({})
        ]);
        const pageCount = Math.ceil(itemCount / req.query.limit);

        if (req.accepts('json')) {
            res.json({
                object: 'list',
                has_more: paginate.hasNextPages(req)(pageCount),
                data: results
            });
        } else {
            res.render('game_list', {
                gameData: results,
                pageCount,
                itemCount,
                pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
            });
        }    
    } catch (err) {
        next(err);
    }
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

//About Page
app.get('/about', function(req, res){
    res.render('about')
})

//Add Game Form/Page
app.get('/add_game', function(req, res){
    res.render('add_game')
})
app.post('/add_game/', function(req, res){
    console.log('Submitted');
})

//ID list page
app.get('/idList', (req, res) => {
    gameData.find({}, function(err, gameSchema){
        if(err){
            console.log(err);
        } else {
            res.render('idList', {
                gameData: gameSchema
            })    
        }
    })  
});

//Listen on port 3000
app.listen(3000, function(){
    console.log('Server is started on port 3000...')
})