//Mongo db stuff
const MongoClient = require('mongodb').MongoClient
//I usually have proper password in <password>
const uri = "mongodb+srv://usersDBAdmin:password7@users.p6jfsqo.mongodb.net/?retryWrites=true&w=majority"; 
const client = new MongoClient(uri);
const userSchema = require('./user-schema');

async function main(){
    try {
        console.log("Attempting connection to db");
        await client.connect();
        console.log("Connected to db");
        //This works as expected
        //await updateListing(client, "user1235", {userName: "user123"}); 
    } catch (e) {
        console.error(e);
    }
} 

//Call main
//
main().catch(console.error);

const express = require('express');
const app = express();
const PORT = 8000;
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

const db = client.db("userAccounts");
const userAccounts = db.collection("users");


//Node API stuff
app.put('/api/put/:username&:password', async (req, res )=>{
    try {
        const userUsername = req.params.username;
        const userPassword = req.params.password;
        console.log(userUsername);
        console.log(userPassword);
        const rand = Math.floor(Math.random() * (10-1+1)) +1
        const newName = "user123" + rand.toString();
        const result = await updateListing(client, userAttempt, {username: newName}); //This is how I want to do it
        console.log(result);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }
})

app.get('/', (request, response)=>{
   // response.sendFile(__dirname + '/index.html');
    console.log("made get request");
    response.end();
})

app.get('/api', (request, response)=>{
   // response.json();
   console.log("made get request with api");
   response.end();
})

app.post('/api/attemptLogin/:user', async (req, res)=>{
    console.log(req.body);
    //try and find user
    const userFound = await userAccounts.findOne(req.body);
    if(userFound){
        console.log("user exists");
        res.json(userFound);
    }else
    {
    //check if username exists  and incorrect password
        const userExists = await userAccounts.findOne({username: req.params.user});
        if(userExists){
            res.json({userExists: "incorrect password"});
        }else{
            res.json({userExists: "user does not exist"});
        }
        
    }
})

/*** const newUser = {
            username: req.params.user,
            password: req.body.password,
            Inventory: [
            {name: 'smg', description: 'fast shooter', class: 1, weight: 20, value: 50, basedamage: 10, critmultiplier: 1.5, magcapacity: 30, ammoinchamber: 20, level: 1, firerate: 1}, 
            {name: 'veterrli', description: 'long range bolt', class: 1, weight: 35, value: 100, basedamage: 25, critmultiplier: 2.25, magcapacity: 12, ammoinchamber: 8, level: 3, firerate: 2},
            {name: 'battle rifle', description: 'burster', class: 1, weight: 30, value: 225, basedamage: 15, critmultiplier: 3.75, magcapacity: 45, ammoinchamber: 10, level: 6, firerate: 3},
            {name: 'cloth helmet', description: 'covering heads', class: 2, weight: 25, value: 125, slot: 1, type: 1, armor: 50 },
            {name: 'cyber chest', description: 'protect heart and lungs', class: 2, weight: 55, value: 325, slot: 2, type: 2, armor: 150},
            {name: 'bulwark pants', description: 'heavy plating pants', class: 2, weight: 65, value: 250, slot: 3, type: 3, armor: 225}
        ]} */

/**const newUser = {
            username: req.params.user,
            password: req.body.password,
            Inventory: [{name: '', description: '', class: 0, weight: 0, value: 0}]
        } */

app.post('/api/createUser/:user', async (req, res) =>{
    //double check user doesn't already exist
    console.log(req.body);
    const userFound = await userAccounts.findOne({username: req.params.user});
    if(userFound){
        res.json({userCreated: "user already exists"});
    }else{
        //try and add user to db
        //Construct empty inventory
        const newUser = {
            username: req.params.user,
            password: req.body.password,
            Inventory: [{name: '', description: '', class: 0, weight: 0, value: 0}]
        }
        //Add empty inventory
        //const addedInventory = await userAccounts.updateOne(req.body, {$push: newUser});
        const addedInventory = await userAccounts.insertOne(newUser);
        if(addedInventory){
            console.log("user created");
            res.json({userCreated: "success"});
        }
        else{
        console.log("user not created");
        res.json({userCreated: "failure"});
        }
          
    }
})

app.listen(process.env.PORT || PORT, ()=>{
    //console.log(`cool stuff on port ${PORT}`);
});


//Mongo Async Methods
async function updateListing(client, listingToUpdate, updateListing){
    
    try {
        console.log("Attempting to add to db");
        const result = await userAccounts.updateOne({userName: listingToUpdate }, {$set: updateListing});
        console.log(`${result.matchedCount} docs found`);
        console.log(`${result.modifiedCount} docs updated`);
    }catch(error){
        console.log(error);
    }
}

async function createListing(client, newListing){
    const result = await client.db("userAccounts").collection("users").insertOne(newListing);
 }

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases");
    databasesList.databases.forEach(element => {
        console.log(`- ${element.name}`);
    });
}



   /** await createListing(client, {
            userName: "user123",
            password: "password123",
            Inventory : [
                {Weapons: [{Blunt : [{ItemName: "Axe", ItemWeight: 50, Description: "And my Axe!"}, {ItemName: "Axe", ItemWeight: 50, Description: "And my Axe!"}, {ItemName: "Axe", ItemWeight: 50, Description: "And my Axe!"}]}, {Sharp : [{ItemName: "Sword", ItemWeight: 50, Description: "Swing!"}, {ItemName: "Sword", ItemWeight: 50, Description: "Swing!"}, {ItemName: "Sword", ItemWeight: 50, Description: "Swing!"}, {ItemName: "Sword", ItemWeight: 50, Description: "Swing!"}]}]},
                {Treasure: [ {ItemName: "unknown", ItemWorth: 0, Description: "Shiny shiny"}, {ItemName: "unknown", ItemWorth: 0, Description: "Shiny shiny"}, {ItemName: "unknown", ItemWorth: 0, Description: "Shiny shiny"}, {ItemName: "unknown", ItemWorth: 0, Description: "Shiny shiny"}]},
                {QuestItems: [{QuestName: "QuestName", QuestWayPoint: [100, 200, 300], Description:"This is a quest"}, {QuestName: "QuestName", QuestWayPoint: [100, 200, 300], Description:"This is a quest"}, {QuestName: "QuestName", QuestWayPoint: [100, 200, 300], Description:"This is a quest"}, {QuestName: "QuestName", QuestWayPoint: [100, 200, 300], Description:"This is a quest"}]}
            ]
        }) */

        //[{Weapons: [{key: value}, {}, {}]}, {Treasure:[{}, {}, {}]}, {[{}, {}, {}]}]

       // await updateListing(client, "user1234", {userName: "user1235"});
        //await listDatabases(client);



        const newUser = {
            username: req.params.user,
            password: req.body.password,
            Inventory: [{name: 'smg', description: 'fast shooter', class: 1, weight: 20, value: 50, basedamage: 10, critmultiplier: 1.5, magcapacity: 30, ammoinchamber: 20, level: 1, firerate: 1}, 
            {name: 'veterrli', description: 'long range bolt', class: 1, weight: 35, value: 100, basedamage: 25, critmultiplier: 2.25, magcapacity: 12, ammoinchamber: 8, level: 3, firerate: 2},
            {name: 'battle rifle', description: 'burster', class: 1, weight: 30, value: 225, basedamage: 15, critmultiplier: 3.75, magcapacity: 45, ammoinchamber: 10, level: 6, firerate: 3},
            {name: 'cloth helmet', description: 'covering heads', class: 2, weight: 25, value: 125, slot: 1, type: 1, armor: 50 },
            {name: 'cyber chest', description: 'protect heart and lungs', class: 2, weight: 55, value: 325, slot: 2, type: 2, armor: 150},
            {name: 'bulwark pants', description: 'heavy plating pants', class: 2, weight: 65, value: 250, slot: 3, type: 3, armor: 225}
        ]
        }