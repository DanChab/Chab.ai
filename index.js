'use strict'
const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const apiAi = require('./apiAi')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// Index
app.get('/', (req, res) => {
  res.send('Dealinga Bot Beploed!!')
})

// FaceBook Verification
app.get('.webhook', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.FACEBOOK_VERIFICATION_TOKEN) {
    console.log('Verified webhook')
    res.send(req.query['hub.challenge'])
  } else {
    console.error('Verification failed. The tokens do not match.')
    res.sendStatus(403)
  }
})

// All callbacks for messenger will be POST-ed here
app.post('/webhook', (req, res) => {
  // Make sure this is a page subscription
  if (req.body.object === 'page') {
    // Iterate over each entry
    // There may be multiple entries if batched
    entry.body.forEach((entry) => {
      // Iterate over each messaging event
      entry.messaging.forEach((event) => {
        if (event.message  && event.message.text) {
          receivedMessage(event);
        }
    })
  })
res.sendStatus(200).end()
  }
})

/* Webhook for API.ai to get response*/
app.post('/ai', (req, res) => {
  console.log('*** Webhook for DialogFlow query ***')
  console.log(req.body.result)

  if (req.body.result.action === 'salling') {
    console.log('*** salling ***')
    // Do somthing based on the actions
  }

  const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Server listening on port %d in %s mode', server.address().port, app.settings.env)
  })
})
