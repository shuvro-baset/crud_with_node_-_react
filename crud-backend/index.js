const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// use cors into my app 
app.use(cors());
// receive json data from frontend
app.use(express.json());


// database connection url
const uri = "mongodb+srv://shuvro-75:Shuvro7523@cluster0.oh18i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
      await client.connect();
      const database = client.db("crudDb");
      const usersCollection = database.collection("users");
        
      // GET API
      app.get('/users', async (req, res) => {
        const cursor = usersCollection.find({});
        const users = await cursor.toArray();
        res.send(users);
    });
      // POST API
      app.post('/add-users', async (req, res) => {
        const newUser = req.body
        const result = await usersCollection.insertOne(newUser);
        res.send(result);
        // console.log(newUser)
      })
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);


// listen on port 5000
app.listen(port, ()=>{
    console.log("listening on port", port);
})