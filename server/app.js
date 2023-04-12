const express = require('express')
const { sequelize, Country } = require('./models')
const { handleAuthorBook } = require('./queryBook')
const app = express()
app.use(express.json())

app.get('/getRandomCountry', async (req, res) => {
  commonRequest(async () => {
    const { full_name, country_code } = await Country.findOne({ order: sequelize.random()})

    return res.status(200).json({ country: { full_name, country_code }})
  })
})

app.get('/getTop3ReadBook', async (req, res) => {
  try {

    // valid param
    const countryResult = await Country.findOne({ where: { country_code: req.query.country }})
    if(countryResult === null) {
      return res.status(400).json({ message: 'invalid param' })
    }
    
    // getAuthorBookByCountry
    const books = await handleAuthorBook(countryResult.country_id)
    if(books === null) {
      return res.status(200).json({ data: [], message: 'no result' })
    }
    return res.status(200).json({ data: books })


  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Something went wrong' })
  }
})

const commonRequest = fn => {
  try {
    fn()
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Something went wrong' })
  }
}

app.listen({ port: 8080 }, async () => {
  console.log('Server up on http://localhost:8080')
  await sequelize.authenticate()
  // await sequelize.sync({ force: true });
  console.log('Database Connected!')
})