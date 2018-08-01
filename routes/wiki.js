const express = require('express')
const index = require('../views/index')
const {Page,User} = require('../models')

const router = express.Router()

router.get('/', (req, res, next)=> {
  res.redirect('/')
})

const slugger = (title) => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.post('/', async (req,res,next)=> {


  try{

    let user = await User.create({
      name: req.body.name,
      email: req.body.email,
    })
    let page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      slug: slugger(req.body.title),
      where: {
        authorId: user.dataValues.id
      }
    })

    page.setAuthor(user);
    page.save()
    console.log(user)
    console.log(page)

    res.redirect(`/wiki/${page.slug}`)
  } catch (error) { next(error)}
})

router.get('/add', (req,res)=> {
  res.send(index.addPage())
})

router.get(`/:slug`, async (req,res,next)=> {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    })
    // const user = await User.findOne()
    res.send(page)
    // res.send(index.wikiPage(page.dataValues))
  } catch (error) { next(error) }

})

module.exports = router;
