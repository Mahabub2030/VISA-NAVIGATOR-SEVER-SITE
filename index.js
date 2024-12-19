const express = require("express");
const cors = require("cors");
const port = process.env.PROT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// JJ9ubIikwwUAuFjt
// Assignment_Ten

// mongodb code start here
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const uri =
  "mongodb://Assignment_Ten:JJ9ubIikwwUAuFjt@ac-cgkxfia-shard-00-00.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-01.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-02.x9t7sgg.mongodb.net:27017/?ssl=true&replicaSet=atlas-nszs70-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // here start
    // const visaCollection =client.db('visaDB').collection('visa');
    // const applicationCollection =client.db('visaDB').collection('applyvisa');

    const visaCollection = client.db("visaoneDB").collection("visa");
    const applicationCollection = client
      .db("visatwoDB")
      .collection("visaapplication");

    //! custome code start here
    app.post("/visa", async (req, res) => {
      const Newvisa = req.body;
      console.log(Newvisa);
      const result = await visaCollection.insertOne(Newvisa);
      res.send(result);
    });

    app.post('/visa', async (req, res) => {
      const newVisa = req.body;
      console.log(newVisa); 
      const result = await visaCollection.insertOne(newVisa); 
      res.send(result);
    });

    // custome code start here
    //-----------------------------------------------------------------------
    // app.post('/applyvisa', async(req, res)=>{
    //   const visa = req.body
    //   console.log(visa);
    //   const result = await  applicationCollection.insertOne(visa)
    //   console.log(result);
    //   res.send(result)
    // })

    app.post("/applicationVisa", async (req, res) => {
      const newApplication = req.body;
      console.log(newApplication); 
      const result = await applicationCollection.insertOne(newApplication); 
      res.send(result);
    });

    // ---------------------------------------------------------------------------
    // app.get("/applicationVisa", async (req, res) => {
    //   const userEmail = req.params.email;
    //   console.log("user",userEmail);

    //   const query = {email : userEmail };
    //   const result = await applicationCollection.findOne(query);

    //   if (result) {
    //     res.send(result);
    //     console.log('mydata ', result);
    //   } else {
    //     res.status(404).send({ message: "No data found for this email!" }); 
    //   }
    // });

    // ------------------------------------------------------------------------
    app.get("/applicationVisa", async (req, res) => {
      const userEmail = req.query.email;
      console.log(userEmail);

      const query = { email: userEmail }; 
      const result = await applicationCollection.find(query).toArray();

      if (result) {
        res.send(result); 
      } else {
        res.status(404).send({ message: "No data found for this email!" }); 
      }
    });

  //----------------------------------------------------------------------------------------------------------------------------------


  app.get("/myaddVisa", async(req, res)=>{
    const user = req.query.email
    const query = { email : user }
    const result = await visaCollection.find(query).toArray()
    res.send(result)
  })


    //------------------------------------------------------------------------------------------------------------------------------------

    app.get("/visa", async (req, res) => {
      const cursor = visaCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // views Details page
    app.get("/details/:id", async (req, res) => {
      const id = req.params.id;
      const qurey = { _id: new ObjectId(id) };
      const result = await visaCollection.findOne(qurey);
      res.send(result);
    });

    // custome code ends here

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// mongodb code ends here

app.get("/", (req, res) => {
  res.send("Visa Port is runing on Port");
});
app.listen(port, () => {
  console.log(`Sever in runing on Port :${port}`);
});
