const express = require('express')
const mongoose = require('mongoose')

const app = express()

const mongoURL = process.env.mongourl || ''

connectDB()

app.use(express.json({ extented: false }))

app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))

const PORT = 8080

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      autoReconnect: true,
      useNewUrlParser: true
    })

    console.log('MongoDB Connected...')
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
}
