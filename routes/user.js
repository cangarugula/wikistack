const express = require('express')
const index = require('../views/index')
const {User} = require('../models')

const router = express.Router()

router.get('/', (req, res)=> {
  res.redirect('/')
})

router.post('/', async (req,res,next)=> {
  await User.create({
    name: req.body.name,
    email: req.body.email
  })
  next()
})

router.get('/add',(req,res)=> {
  res.send(index.addPage())
})

module.exports = router
