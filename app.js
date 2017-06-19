'use strict';
const PORT_NUMBER = 8080;

let express = require("express");
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(PORT_NUMBER, function() {
    console.log(`We are listing on port ${PORT_NUMBER}`);
});

//importing in the faker api
let faker = require('faker');

//these are the created array that will randomly create the weapons, rooms and characters for the game.

let possibleRoom = faker.random.arrayElement(["kitchen", "ballroom", "conservatory", "billiard room", "library", "study", "hall", "lounge", "dining room", "cella"]);

let possibleWeapon = faker.random.arrayElement(["candlestick", "rope", "pistol", "knife", "lead pipe", "wrench", "poison", "horseshoe"]);

let possibleSuspect = faker.random.arrayElement(["Miss Scarlett", "Professor Plum", "Mrs. Peacock", "Reverend Mr. Green", "Colonel Mustard", "Mrs. White"]);

//posting to the server url.com/cluegame
app.post("/cluegame", function(req, res, next)
{
    //user request in body for room
    let userRoom = req.body.room;
    
     //user request in body for weapon
    let userWeapon = req.body.weapon;
    
     //user request in body for suspect
    let userSuspect = req.body.suspect;
    
//the first if statement for the corrected guess.
    if(userRoom===possibleRoom && userWeapon === possibleWeapon && userSuspect === possibleSuspect)
    {
        res.send(`You guess correct. The killer was ${possibleSuspect} whom used the ${possibleWeapon}
        to kill the victim in the ${possibleRoom}. There is another killer, please continue solving the mystery`);
        
        possibleRoom = faker.random.arrayElement(["kitchen", "ballroom", "conservatory", "billiard room", "library", "study", "hall", "lounge", "dining room", "cella"]);

        possibleWeapon = faker.random.arrayElement(["candlestick", "rope", "pistol", "knife", "lead pipe", "wrench", "poison", "horseshoe"]);

        possibleSuspect = faker.random.arrayElement(["Miss Scarlett", "Professor Plum", "Mrs. Peacock", "Reverend Mr. Green", "Colonel Mustard", "Mrs. White"]);
    }
        
    //the following if-else statement will give the user hints on what they guess correct or not.
    
    else if (userRoom!==possibleRoom && userWeapon === possibleWeapon && userSuspect === possibleSuspect)
    {
        res.send(`You guess the weapon and suspect correct but not the room, trying again!`);
    }
    else if (userRoom===possibleRoom && userWeapon !== possibleWeapon && userSuspect === possibleSuspect)
    {
        res.send('You guess the room and suspect correct but not the weapon, try again!');
    }
    else if(userRoom===possibleRoom && userWeapon === possibleWeapon && userSuspect !== possibleSuspect)
    {
        res.send('You guess the room and weapon correct but not the suspect, try again!');
    }
    else if (userRoom!==possibleRoom && userWeapon !== possibleWeapon && userSuspect === possibleSuspect)
    {
        res.send("You guess the suspect correct but not the weapon or the room, try again!");
    }
    else if (userRoom===possibleRoom && userWeapon !== possibleWeapon && userSuspect !== possibleSuspect)
    {
        res.send('You guess the room correct but not the weapon or the suspect, try again!');
    }
    else (userRoom!==possibleRoom && userWeapon === possibleWeapon && userSuspect !== possibleSuspect)
    {
        res.send('You guess the weapon correct but not the room or the suspect, try again!');
    }
    //can a switch statement do the same as above if else statement?
}
);