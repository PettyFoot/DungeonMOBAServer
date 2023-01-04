//Mongo db stuff
const MongoClient = require('mongodb').MongoClient
//I usually have proper password in <password>
const uri = "mongodb+srv://usersDBAdmin:password7@users.p6jfsqo.mongodb.net/?retryWrites=true&w=majority"; 
const client = new MongoClient(uri);


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
app.put('/api/put/:user', async (req, res )=>{
    try {
        const userAttempt = req.params.user;
        console.log(userAttempt);
        const rand = Math.floor(Math.random() * (10-1+1)) +1
        const newName = "user123" + rand.toString();
        const result = await updateListing(client, userAttempt, {userName: newName}); //This is how I want to do it
        console.log(result);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }
})

app.get('/', (request, response)=>{
   // response.sendFile(__dirname + '/index.html');
    console.log("Made get request");
    response.end();
})

app.get('/api', (request, response)=>{
   // response.json();
   console.log("Made get request with api");
   response.end();
})

app.get('/api/createUser/:user', async (req, res) =>{
    const userExists = await userAccounts.findOne({userName: req.params.user});
    if(userExists){
        console.log("user exists");
        res.json({userExists: true});
    }else
    {
        console.log("user does not exist");
        res.json({userExists: false});
    }
    res.end();
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