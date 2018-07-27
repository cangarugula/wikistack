const express = require('express')


// const pg = require('pg');
// const client = new pg.Client('postgres://localhost:wikistack')
// client.connect()
const { db, Page, User } = require('./models')
const index = require('./views/index')
const app = express()
const morgan = require('morgan');

const bodyParser = require('body-parser');

app.use(express.static(__dirname + "/views/public"))

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))

app.get('/', (req,res,next) => {
  res.send(index.layout('hello world'))
})

db.authenticate()
  .then(()=> {
    console.log('connected to the database')
  })



const syncing = async ()=> {
  try{
    await db.sync({force:true})
    await User.sync()
    await Page.sync()
  } catch (error) {
    console.log(error)
  }
}

syncing()
let port = process.env.PORT || 3000;
app.listen(port, ()=> { console.log(`listening on port ${port}`)})
