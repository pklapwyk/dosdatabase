const express = require('express');
const app = express();
const mongoose = require('mongoose');

// articles per page
var limit = 10;

//Connect to Mongo Database
mongoose.connect('mongodb://localhost/dosdatabase');

//Check Mongo connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Database')
});

// pagination middleware function sets some
// local view variables that any view can use
function pagination(req, res, next) {
    var page = parseInt(req.params.page) || 1,
        num = page * limit;
    db.articles.count(function(err, total) {
        res.local("total", total);
        res.local("pages", Math.ceil(total / limit));
        res.local("page", page);
        if (num < total) res.local("prev", true);
        if (num > limit) res.local("next", true);
        next();
    });
}

// a few sample routes using the pagination middleware
// both of them use the same view, which is enhanced
// by the local variables setup in the pagination function
app.get('/', pagination, function(req, res) {
    db.logs.update({}, {$inc:{count:1}});
    db.articles.find({}, {'snippet':1,'images':1,'date':1,'title':1}, {limit:limit, sort: [['date','desc']]}, function(err, cursor) {
        cursor.toArray(function(err, articles) {
            res.render('home.html', {
                articles: articles
            });
        });
    });
});

// this route helps us view paginated pages,
// but thanks to the middleware, doesn't have 
// to do anything fancy before rendering its view
app.get('/pages/:page', pagination, function(req, res) {
    var page = req.params.page || 1
    db.articles.find({}, {'snippet':1,'images':1,'date':1,'title':1}, {skip: (page - 1) * limit, limit: limit, sort: [['date','desc']]}, function(err, cursor) {
        cursor.toArray(function(err, articles) {
            res.render('home.html', {
                articles: articles
            });
        });
    });
});

//Listen on port 3000
app.listen(3000, function(){
    console.log('Server is started on port 3000...')
})