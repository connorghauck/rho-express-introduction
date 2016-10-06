var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();




// middleware function, gets executed on each request
app.use(function(req, res, next){
    console.log('Got a request!');
    next();
});


// middleware for parsing the body and turning it into a JS object
app.use(bodyParser.urlencoded({extended: true}));




app.post('/', function(req, res){
    console.log('req.body:', req.body);
    res.sendStatus(200);
});




app.get('/', function(req, res){ //route (GET, POST, ETC.) + path ('/' '/kittens') + handler ('function(){}')
    console.log('Received a request at', new Date());


    var filename = path.join(__dirname, 'public/views/index.html'); //__dirname is a global variable that represents the directory that this specific file lives in
    console.log('filename:', filename);
    res.sendFile(filename);

//this basically takes the folder that index.html is in and then send index.html from that folder.

//res.send('Hello world!'); //the response object is going to hav ea few methods associated with it, one of the most common being the send method.
});//telling express to listen specifically for get requests. first you need the path '/', then you tell it what to do once it gets the request
//this is a request and response set of parameters. the res is the response you are sending back to the client from the server.

app.get('/kittens', function(req, res){

    console.log('Query params:', req.query); //this will give us an object containing all query parameters associated with this particular request.
    if (req.query.age > 2) {
    res.send('MEOW!');
    } else {
    res.send('meow');
    }
});

var songs = []; //create a variable called songs which we will eventually fill with songs, making it an empty array

app.post('/songs', function(req, res){

    var NotTheSame = true; //make a variable to check if things are unique
        songs.forEach(function(song){ //loop through each and check if they're unique
            if (req.body.artist.trim() == song.artist.trim() && req.body.title.trim() == song.title.trim()){
                NotTheSame = false;  //if they aren't, NotTheSame becomes false
            }
        });




if (NotTheSame){
    var date = new Date; //create a new Date
    req.body.date = date.toDateString();//turn that into the date string as req.body so you can add it to the DOM
    songs.push(req.body);  //if it's unique it will push the inputs to req.body and send the 200 status
    res.sendStatus(200);
} else {
    res.sendStatus(404); //if not unique it will 404
}
});


app.get('/songs', function(req, res){
    res.send(songs);
});

// middleware for serving static files
app.use(express.static('public'));

app.listen(3000);
