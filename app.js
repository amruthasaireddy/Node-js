const express = require('express')
const {format} = require('date-fns')

const app = express()

app.get('/', (request, response) => {
  response.send(format(new Date(), 'dd-MM-yyyy'))
})

module.exports = app
