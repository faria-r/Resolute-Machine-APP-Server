const express = require('express');
const cors = require('cors');
const app = express();
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

//middleware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wxeycza.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    const machineCollections = client.db('machineApp').collection('AllMachines');
// API to get all machines
    app.get('/allMachines',async (req,res) =>{
      const query = {};
      const result = await machineCollections.find(query).toArray();
      res.send(result)

    } )
    
    
  } finally {
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
    res.send('machine server running')
  })
  
  app.listen(port, () => {
    console.log(`machine server running on port : ${port}`)
  })