'use strict'
const express = require('express')
const request = require('request')
const bodyParser = require('body-parser')
const apiai = require('apiai')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

apiaiDealinga = apiai(APIAI_TOKEN)

// Index
app.get('/', (req, res) => {
  res.send('Dealinga Bot Beploed!!')
})

// FaceBook Verification
app.get('.webhook', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.VERIFICATION_TOKEN) {
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
