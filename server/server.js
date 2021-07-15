const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.urlencoded({extended: false})) // parses form data

// app.use('/', (req, res, next) => {
//     res.send("Hello from the web server side..." );
//     next();
// })
// app.use("/", (req, res, next) => {
//   console.log(req.path);
//   next();
// });

app.post('/contact', (req, res) => {
    const newMessage = {
        email: req.body.email,
        message: req.body.message
    };
    fs.readFile('contact.json', (err, data) => {
        const messageArr = JSON.parse(data);
       messageArr.push(newMessage)
    fs.writeFile('contact.json', JSON.stringify(messageArr), (err) => {
        if (err) console.log(err);
    })
    })
    res.redirect('/formsubmissions')
});

app.get('/formsubmissions', (req, res) => {
    fs.readFile('contact.json', (err, data) => { 
        res.send(JSON.parse(data));
    })

})

app.use(express.static("public"));

app.listen(3000);
