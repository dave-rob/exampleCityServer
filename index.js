import express from 'express';
import pg from 'pg';

const app = express();
const port = 9000;
const db = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'geo',
    password: '123456',
    port: 5432
})

db.connect();
app.use(express.json());
app.get('/cities', async (req, res) => {
    //query database
    try{
       const {rows} = await db.query("SELECT * FROM cities;");
    res.send(rows); 
    } catch (err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

app.post('/cities', async (req, res) => {
    const { city } = req.body;
    try{
        await db.query("INSERT INTO cities VALUES (default, $1);", [city])
        res.send(`${city} added`);
    } catch (err){
        console.log(err);
        res.status(400).send("Please enter city name");
    }
    
})

app.listen(port, ()=> console.log('Listening at port ', port));