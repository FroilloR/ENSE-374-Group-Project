const fs = require("fs");
const express = require ( "express" );

// this is a canonical alias to make your life easier, like jQuery to $.
const app = express(); 

// host static resources, like js and css
app.use(express.static("public"))

// configure express to access variables in req.body object when submitting forms
app.use(express.urlencoded({ extended: true})); 

// a common localhost test port
const port = 3000; 

// Simple server operation
app.listen (port, () => {
    // template literal
    console.log (`Server is running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post('/todo', (req, res) => {
    // Read the contents of the 'users.json' file
    fs.readFile(__dirname + "/users.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err);
            return;
        }

        try {
            const users = JSON.parse(jsonString).users; 
            // Extract username and password from the request body(input)
            const username = req.body["username"];
            const password = req.body["password"];

            // Find a user in the users array that matches both username and password
            const userFound = users.find(user => user.username === username && user.password === password);

            if (userFound) {
                res.sendFile(__dirname + '/home.html');
                console.log("Correct log-in information");
            } else {
                console.log("Unregistered username or password");
                res.redirect('/');
            }
        } catch ( err ) {
            console.log("Error parsing JSON:", err);
        }
    });
});
