const express = require('express')

const wikiRoutes = require('./routes/wiki');
const userRoutes = require('./routes/user')

const { db, Page, User } = require('./models')
const index = require('./views/index')
const app = express()
const morgan = require('morgan');

const bodyParser = require('body-parser');

app.use(express.static(__dirname + "/views/public"))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use('/wiki',wikiRoutes);
app.use('/user',userRoutes);


app.get('/', async (req,res,next) => {
  try{
  let pages = await Page.findAll().map(page=> {
    return page.dataValues
  })

  console.log(pages)
  res.send(index.main(pages))
  } catch (error) {
    res.send(error)
  }
})





const syncing = async ()=> {
  try{
    await db.sync({force:true})
    await Page.sync()
    await User.sync()
    await db.authenticate()
    console.log('connected to the database')
  } catch (error) {
    console.log(error)
  }
}

syncing()
let port = process.env.PORT || 3000;
app.listen(port, ()=> { console.log(`listening on port ${port}`)})

module.exports = app
