// const { Pool } = require('pg');

const pool = require("./db");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

console.log(process.env.DB_CONNECTION_STRING);

//ROUTES

//create

app.post("/create", async (req, res) => {
  try {
    
    const { username, email, mob, dob } = req.body;
    const newUser = await pool.query("INSERT INTO \"userdb\"  (username, email, mob, dob) VALUES ($1, $2, $3, $4)", [
      username, email, mob, dob
    ]);

    res.json(newUser);
    
  } catch (error) {
    console.log(error);
  }
});

//get

app.get("/get", async (req, res) => {
  try {
    
    const allUsers = await pool.query("SELECT * FROM userdb");

    res.json(allUsers.rows);
    
  } catch (error) {
    console.log(error);
  }
});


//get a singleUser

app.get("/get/:id", async (req, res) => {
  try {

    const {id} = req.params;

    const user = await pool.query('SELECT * FROM userdb WHERE id = $1',[id])
    
    res.json(user.rows);
    
  } catch (error) {
    console.log(error);
  }
});

//update

app.put("/update/:id", async (req, res) => {
  try {

    const {id} = req.params;
    const { username, email, mob, dob } = req.body;
    

    const updateUser = await pool.query(
      'UPDATE userdb SET username = $1, email = $2, mob = $3, dob = $4 WHERE id = $5',
      [username, email, mob, dob, id]
    );
    
    res.json(updateUser);
    
  } catch (error) {
    console.log(error);
  }
});



//delete

app.delete("/delete/:id", async (req, res) => {
  try {

    const {id} = req.params;
    
    

    const deleteUser = await pool.query(
      'DELETE FROM userdb WHERE id = $1',[id]
    );
    
    res.json(deleteUser);
    
  } catch (error) {
    console.log(error);
  }
});
