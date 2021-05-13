// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());


// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;

// Spin up the server
const server = app.listen(port, listening);

// callback to Debug
// console.log(server)

function listening(){
    console.log(`server running`);
    console.log(`running on localhost: ${port}`);
};

// Get function
app.get('/all', sendData);

// Callback  function 
function sendData (request, response) {
  response.send(projectData);
  projectData = {};

}


// POST  function

app.post('/addData', addData);

function addData(request, response) {
    let data = request.body;

    console.log('server side data ', data)
    
    //date
    //temp -> temperature
    // feelings -> user's input
    
    projectData["date"] = data.date;
    projectData["temp"] = data.temp;
    projectData["content"] = data.content;
    
    response.send(projectData);

}

