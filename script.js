const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const bcrypt=require('bcrypt-nodejs');//=>https://www.npmjs.com/package/bcrypt-node
const cors=require('cors');//=>https://www.npmjs.com/package/cors
//requires npm install knex,npm install pg documentation=>https://bookshelfjs.org/
const knex = require('knex');
const register= require('./controllers/register.js')
const signin= require('./controllers/signin.js')
const profile= require('./controllers/profile.js')
const image= require('./controllers/image.js')
const database = knex({
  client: 'pg',
  connection: {
    host     : 'postgresql-defined-04663',
    ssl:true
  }
})

app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) =>
	{
    console.log("OK")
		res.json('database')
	});
app.get('/', (req,res) =>res.send('database'));
app.post('/signin', (req, res) =>signin.handle(req, res,bcrypt,database));
app.post("/register",(req,res) =>register.handle(req, res,bcrypt,database));
app.get('/profile/:id',(req, res)=>profile.handle(req, res,database));
app.put('/image',(req, res)=>image.handle(req, res,database));
app.post('/imageURL',(req, res)=>image.handleApiCall(req, res));

app.listen(process.env.PORT || 3000,()=>
{
	console.log(`app running in port ${process.env.PORT}`)
})