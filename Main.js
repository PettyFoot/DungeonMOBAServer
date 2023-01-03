//Mongo db stuff
/**const MongoClient = require('mongodb').MongoClient
//I usually have proper password in <password>
const uri = "mongodb+srv://usersDBAdmin:<password>@users.p6jfsqo.mongodb.net/?retryWrites=true&w=majority"; 
const client = new MongoClient(uri);

async function main(){
    try {
        await client.connect();
        //This works as expected
        //await updateListing(client, "user1235", {userName: "user123"}); 
    } catch (e) {
        console.error(e)
    }finally{
        //await client.close();
    }
}

main().catch(console.error); */


const express = require('express');
const app = express();
const PORT = 8000;
var path = require('path');
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.json());

const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://usersDBAdmin:password7@users.p6jfsqo.mongodb.net/?retryWrites=true&w=majority")
.then(()=> console.log("DB connected")).catch(()=>console.log("Database connection error"));

mongoose.set('strictQuery', true);

const userSchema = {
    userName: {type: String},
    password: {type: String},
};

const db = mongoose.model('User', userSchema);

app.put('/api/put/:user', async (req, res )=>{

    try {
        //const userAttempt = req.params.user;
        console.log("hello");
       // db.findOneAndUpdate("User1234", {userName: "User1235"});
      //  const result = await updateListing(client, userAttempt, {userName: "user1235"}); //This is how I want to do it
        console.log(userAttempt);
        res.end();
    } catch (error) {
        console.log(error);
        res.end();
    }
})
/**
async function updateListing(client, listingToUpdate, updateListing){
    try {
        const result = await client.db("userAccounts").collection("users").updateOne({userName: listingToUpdate }, {$set: updateListing});
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
} */

//Node API stuff


app.get('/', (request, response)=>{
   // response.sendFile(__dirname + '/index.html');
    console.log("Made get request");
    response.end();


app.get('/api', (request, response)=>{
   // response.json();
   console.log("Made get request with api");
   response.end();
})

app.post('/api/:user', (req, res) =>{
    response.end();
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`cool stuff on port ${PORT}`);
});

/**let db,
    dbConnectionStr = "mongodb+srv://usersDBAdmin:colorado7@users.p6jfsqo.mongodb.net/?retryWrites=true&w=majority",
    dbName = 'users'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    }) */

/**app.put('/api/:user', async (req, res )=>{
    try {
        const userAttempt = req.params.user;
        const result = await updateListing(client, userAttempt, {userName: "user1234"});
        console.log(result);
        console.log("Reached end of try");
        res.end();
    } catch (error) {
        console.log(error);
        console.log("error");
        res.end();
    }
   /** console.log(req.body);
    console.log("Made put request");
    const userAttempt = req.params.user;
    console.log(userAttempt);
   // const result = await updateListing(client, userAttempt, {userName: "user1234"});
    console.log(" this is the result ");
    res.status(200).end(); */
    //Something    dhhwdhwd
//}) */




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