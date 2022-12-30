const { response } = require('express');
const express = require('express');
const app = express();
const PORT = 8000;

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/Response');
   
})

const something = {
    'age': 30,
    'name': 'dirty',
    'location': 'flirty'

    //
}

app.get('/api', (request, response)=>{
    response.json(something);
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`cool stuff on port ${PORT}`);
});