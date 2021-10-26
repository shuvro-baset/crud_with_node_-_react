const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;

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
        const newUser = req.body // receive data from frontend
        const result = await usersCollection.insertOne(newUser); // save data to the database
        res.send(result); // send response to the frontend.
        // console.log(newUser)
      });

      // get single user info
      app.get('/update-user/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const user = await usersCollection.findOne(query);
        console.log('load user with id: ', id, user);
        res.send(user);
      })
      // update user API
      app.put('/update-user/:id', async (req, res) => {
        const id = req.params.id;
        console.log('updating', id)
        const updatedUser = req.body;
        const filter = { _id: ObjectId(id) }; // filtering user's object
        const options = { upsert: true }; // update and insert
        const updateDoc = { // set data
            $set: {
                fname: updatedUser.fname,
                lname: updatedUser.lname,
                address: updatedUser.address,
                email: updatedUser.email
            },
        };
        const result = await usersCollection.updateOne(filter, updateDoc, options) // updating 
        res.json(result) // send response to frontend
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