const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wxeycza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const machineCollections = client
      .db("machineApp")
      .collection("AllMachines");
    const usersCollections = client.db("machineApp").collection("users");
    // API to get all machines
    app.get("/allMachines", async (req, res) => {
      const query = {};
      const result = await machineCollections.find(query).toArray();
      res.send(result);
    });
    //API to post user data on database
    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await usersCollections.findOne(query);
      if (existingUser) {
        return res.send("user exists");
      }
      const result = await usersCollections.insertOne(user);
      res.send(result);
    });
    //API to get user data on database
    app.get("/users", async (req, res) => {
      const query = {};
      const result = await usersCollections.find(query).toArray();
      res.send(result);
    });
    //API to get specific user data
    app.get('/users/:email',async(req,res)=>{
      const user = req.params.email;
      const query={email:user};
      const result = await usersCollections.findOne(query)
      res.send(result);
    })
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("machine server running");
});

app.listen(port, () => {
  console.log(`machine server running on port : ${port}`);
});
