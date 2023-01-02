//Mongo db stuff

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://usersDBAdmin:colorado7@users.p6jfsqo.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function main(){
   // const uri = "mongodb+srv://usersDBAdmin:colorado7@users.p6jfsqo.mongodb.net/?retryWrites=true&w=majority";
   // client = new MongoClient(uri);
    try {
        await client.connect()
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
    } catch (e) {
        console.error(e)
    }finally{
        //await client.close();
    }
}

main().catch(console.error);

async function createListing(client, newListing){
   const result = await client.db("userAccounts").collection("users").insertOne(newListing);
}

async function updateListing(client, listingToUpdate, updateListing){
    console.log("Called updateListing");
    const result = await client.db("userAccounts").collection("users").updateOne({userName: listingToUpdate }, {$set: updateListing});
    console.log("tried to update");
    console.log(`${result.matchedCount} documents were found`);
    console.log(`${result.modifiedCount} were updated`);
}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases");
    databasesList.databases.forEach(element => {
        console.log(`- ${element.name}`);
    });
}

//Node API stuff

const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 8000;
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

app.get('/', (request, response)=>{
   // response.sendFile(__dirname + '/index.html');
    console.log("Made get request");
})


app.get('/api', (request, response)=>{
   // response.json();
   console.log("Made get request with api");
   
})

app.post('/api/:user', (req, res) =>{

})

app.put('/api/:user', async (req, res )=>{
    console.log(req.body);
    console.log("Made put request");
    const userAttempt = req.params.user;
    console.log(userAttempt);
    const result = await updateListing(client, userAttempt, {userName: "user1234"});
    console.log(result);
    res.status(200).end();
    //Something
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`cool stuff on port ${PORT}`);
});