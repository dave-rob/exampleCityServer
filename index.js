import express from 'express';

const app = express();
const port = 9000;



app.listen(port, ()=> console.log('Listining at port ', port));