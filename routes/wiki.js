const express = require('express')
const index = require('../views/index')
const {Page} = require('../models')

const router = express.Router()

router.get('/', (req, res, next)=> {
  res.redirect('/')
})

const slugger = (title) => {
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}

router.post('/', async (req,res,next)=> {

  let title = req.body.title;
  let content = req.body.content;
  console.log(title);
  console.log(content)

  const page = new Page({
    title: req.body.title,
    content: req.body.content,
    slug: slugger(req.body.title)
  })
  try{
    await page.save()
    page.get()
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

    res.send(index.wikiPage(page.dataValues))
  } catch (error) { next(error) }

})

module.exports = router;
