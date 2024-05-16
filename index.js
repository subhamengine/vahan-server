const { Pool } = require('pg');

 const pool = require("./db");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server started on port 5000");
});


//ROUTES

//create

// app.post("/create", async (req, res) => {
//   try {
    
//     const { username, email, mob, dob } = req.body;
//     const newUser = await pool.query("INSERT INTO \"userdb\"  (username, email, mob, dob) VALUES ($1, $2, $3, $4)", [
//       username, email, mob, dob
//     ]);

//     res.json({newUser,status:200});
    
//   } catch (error) {
//     console.log(error);
//   }
// });

// //get

// app.get("/get", async (req, res) => {
//   try {
    
//     const allUsers = await pool.query("SELECT * FROM userdb");
//     if(allUsers){
//       res.status(200).json({users : allUsers.rows, status : 200});
//     }
//     else{
//       res.status(400).json("Error creating the user!");
//     }

    
    
//   } catch (error) {
//     res.status(400).status(error.detail);
//     console.log(error);
//   }
// });


// //get a singleUser

// app.get("/get/:id", async (req, res) => {
//   try {

//     const {id} = req.params;

//     const user = await pool.query('SELECT * FROM userdb WHERE id = $1',[id])
    
//     res.json(user.rows);
    
//   } catch (error) {
//     console.log(error);
//   }
// });

// //update

// app.put("/update/:id", async (req, res) => {
//   try {

//     const {id} = req.params;
//     const { username, email, mob, dob } = req.body;
    

//     const updateUser = await pool.query(
//       'UPDATE userdb SET username = $1, email = $2, mob = $3, dob = $4 WHERE id = $5',
//       [username, email, mob, dob, id]
//     );
    
//     res.status(200).json({status:200,updateUser});
    
//   } catch (error) {
//     console.log(error);
//   }
// });



// //delete

// app.delete("/delete/:id", async (req, res) => {
//   try {

//     const {id} = req.params;

//     const deleteUser = await pool.query(
//       'DELETE FROM userdb WHERE id = $1',[id]
//     );
    
//     res.status(200).json({status : 200 ,deleteUser});
    
//   } catch (error) {
//     console.log(error);
//   }
// });






// POST - Create a new user
app.post("/create", async (req, res) => {
  try {
    const { username, email, mob, dob } = req.body;
    const newUser = await pool.query("INSERT INTO \"userdb\" (username, email, mob, dob) VALUES ($1, $2, $3, $4)", [
      username, email, mob, dob
    ]);

    res.status(201).json({ newUser, status: 201 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET - Retrieve all users
app.get("/get", async (req, res) => {
  try {
    const allUsers = await pool.query("SELECT * FROM userdb");
    res.status(200).json({ users: allUsers.rows, status: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET - Retrieve a single user by ID
app.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM userdb WHERE id = $1', [id]);
    
    if (user.rows.length === 0) {
      res.status(404).json({ error: "User not found", status: 404 });
    } else {
      res.status(200).json(user.rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT - Update a user by ID
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, mob, dob } = req.body;

    const updateUser = await pool.query(
      'UPDATE userdb SET username = $1, email = $2, mob = $3, dob = $4 WHERE id = $5',
      [username, email, mob, dob, id]
    );

    if (updateUser.rowCount === 0) {
      res.status(404).json({ error: "User not found", status: 404 });
    } else {
      res.status(200).json({ status: 200, updateUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE - Delete a user by ID
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteUser = await pool.query(
      'DELETE FROM userdb WHERE id = $1', [id]
    );

    if (deleteUser.rowCount === 0) {
      res.status(404).json({ error: "User not found", status: 404 });
    } else {
      res.status(200).json({ status: 200, deleteUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



















