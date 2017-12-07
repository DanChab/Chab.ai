const apiai = require('apiai')
const request = require('request')

// Set the DialogFlow token 
const APIAI_TOKEN = process.env.DEALINGA_TOKEN
const apiaApp = apiai(APIAI_TOKEN)

/* Event from Facebook api to pass to the DialogFlow api*/
const receivedMessage = (event) => {
  let sender = event.sender.id
  let text = event.message.text

  /* Send the text to DialogFlow api*/
  let apiai = apiaApp.textRequest(text, { sessionId:'the_master_bird'})
  apiai.on('response', (response)=>{
    let aiText = response.result.fulfillment.speech
    console.log(`=== Response from the AI ===`)
    console.log(`${aiText} ✅`)
    switch(aiText) {
      case '':
        break

      default:
      /* Sending the response to FB api*/
        prepareSendAiMessage(sender,aiText)
    }
  })

  apiai.on('error',(error) => {
    console.error(`${error} ❌`)
  })
  apiai.end()
}


const sendMessage = (messageData) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: PAGE_ACCESS_TOKEN},
    methode: 'POST',
    json: messageData
  }, (error, response) => {
    console.log('=== Posting to FaceBook api ===')
    if (error){
      console.error('Error sending message: ', error)
    } else if (response.body.error) {
      console.error(`${response.body.error} ❌`)
    }
  })
}

const prepareSendAiMessage = (sender, aiText) =>{
  let messageData = {
    recipient: {id: sender},
    message: {text: aiText}
  }
  sendMessage(messageData)
}

module.exports = {
  receivedMessage
}