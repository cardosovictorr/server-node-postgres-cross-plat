const express = require('express');
const app = express();
const port = 5000;
//const merchant_model = require('./merchant_model');
const pool = require("./db");
const cors = require("cors");

//middleware
app.use(cors());
app.use(express.json());




app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

//ROUTES//

//CREATE a user
//post is because we are ADDING a data
app.post("/users", async (req, res) => {
    try {
        const { name } = req.body;
        const { email } = req.body;
        const { password } = req.body;
        const newName = await pool.query("INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, password]);
        res.json(newName.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//CREATE a data Coffee
//post is because we are ADDING a data
app.post("/coffee", async (req, res) => {
    try {
        const { date_sales } = req.body;
        const { quantity } = req.body;
        const { week_day } = req.body;
        const newName = await pool.query("INSERT INTO coffee_sales (date_sale, quantity, week_day) VALUES($1, $2, $3) RETURNING *", [date_sales, quantity, week_day]);
        res.json(newName.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});

//GET all users

app.get("/users", async (req, res) => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        res.json(allUsers.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//GET all coffee data

app.get("/coffee", async (req, res) => {
    try {
        const allCoffee = await pool.query("SELECT * FROM coffee_sales");
        res.json(allCoffee.rows);
    } catch (err) {
        console.error(err.message);
    }
})


//GET a specific user

app.get("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//GET a specific Coffee sale

app.get("/coffee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const coffee = await pool.query("SELECT * FROM coffee_sales WHERE id = $1", [id]);
        res.json(coffee.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//POST Login
app.get("/login", async (req, res) => {
    try {
        const { name } = req.params;
        const { password } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE name = $1 AND password = $2", [name, password]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})


//PUT update a user 
app.put("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updateUser = await pool.query("UPDATE users SET name = $1 WHERE id = $2", [name, id]);
        res.json("User was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//PUT update a coffee
app.put("/coffee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;
        const updateCoffee = await pool.query("UPDATE coffee_sales SET quantity = $1 WHERE id = $2", [quantity, id]);
        res.json("Coffee Sale was updated");
    } catch (err) {
        console.error(err.message);
    }
})

//DELETE an user 
app.delete("/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteUser = await pool.query("DELETE FROM users WHERE id = $1", [id]);
        res.json("User was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

//DELETE an user 
app.delete("/coffee/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteCoffee = await pool.query("DELETE FROM coffee_sales WHERE id = $1", [id]);
        res.json("User was deleted");
    } catch (err) {
        console.error(err.message);
    }
})

// app.get('/', (req, res) => {
//     res.status(200).send('Hello World!');
// })

// app.use(express.json())
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
//     next();
// });

// app.get('/', (req, res) => {
//     merchant_model.getUsers()
//         .then(response => {
//             res.status(200).send(response);
//         })
//         .catch(error => {
//             res.status(500).send(error);
//         })
// })

// app.post('/users', (req, res) => {
//     merchant_model.createUser(req.body)
//         .then(response => {
//             res.status(200).send(response);
//         })
//         .catch(error => {
//             res.status(500).send(error);
//         })
// })

// app.delete('/users/:id', (req, res) => {
//     merchant_model.deleteUser(req.params.id)
//         .then(response => {
//             res.status(200).send(response);
//         })
//         .catch(error => {
//             res.status(500).send(error);
//         })
// })
// app.listen(port, () => {
//     console.log(`App running on port ${port}.`)
// })