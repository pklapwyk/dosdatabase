const express = require('express');
//const logger = require('morgan');

const app = express();

const MongoClient = require('mongodb').MongoClient;
const db = 'mongodb://localhost:27017';



app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/game_list', (req, res) => {
    gameModel.find({}, function(req, res){
        res.render('game_list')
    })  
});  

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/add_game', (req, res) => {
    res.render('add_game')
})

app.post('/add_game/', (req, res) => {
    console.log('Submitted');
})

app.listen(3000, function(){
     console.log('Server is started on port 3000...')
})