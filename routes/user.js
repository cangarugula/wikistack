const express = require('express')
const index = require('../views/index')

const router = express.Router()

router.get('/', (req, res)=> {
  res.redirect('/')
})

router.post('/', (req,res)=> {
  res.send('post to user')
})

router.get('/add',(req,res)=> {
  res.send(index.addPage())
})

module.exports = router
