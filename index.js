const express = require('express');
const { v4: uuidv4 } = require('uuid');
const getPointsFromReceipt = require('./calculatePoints');

const app = express();
const PORT = 3000;

// middleware to parse incoming JSON
app.use(express.json());

// MEMORY
const receipts = {};

// POST /receipts/process
// receives receipt JSON, stores with unique ID, and returns ID
app.post('/receipts/process', (req, res) => {
  const receipt = req.body;

  // add validation HERE


  const id = uuidv4(); // generate unique ID for receipt
  receipts[id] = receipt; //store receipt in memory

  console.log(`Receipt received and stored. ID: ${id}`);
  
  res.json({ id }); // respond with new ID
});

// GET /receipts/:id/points
// looks up receipt by ID and returns points
app.get('/receipts/:id/points', (req, res) => {
  const id = req.params.id;
  const receipt = receipts[id]; // find receipt in memory

  if (!receipt) {
    return res.status(404).json({ error: 'Receipt not found' });
  }

  const totalPoints = getPointsFromReceipt(receipt);
  console.log(`Points calculated. ID: ${id} | Points: ${totalPoints}`);
  res.json({ points: totalPoints });


});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
