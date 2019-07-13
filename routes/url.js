const express = require('express')
const router = express.Router()
const validUrl = require('valid-url')
const shortid = require('shortid')

const Url = require('../models/Url')

router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body
  const baseUrl = process.env.baseurl || 'http://localhost:8080'

  // Check long url
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json('Invalid long url')
  }

  // Create url code
  const urlCode = shortid.generate()

  try {
    let url = await Url.findOne({ longUrl })

    if (url) {
      res.json(url)
    } else {
      const shortUrl = baseUrl + '/' + urlCode

      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date()
      })

      await url.save()

      res.json(url)
    }
  } catch (err) {
    console.error(err)
    res.status(500).json('Server error')
  }
})

module.exports = router
