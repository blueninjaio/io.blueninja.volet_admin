/**
|--------------------------------------------------
| Push's Controller
|--------------------------------------------------
*/
const {Expo}                 = require('expo-server-sdk')
const expo                   = new Expo()
const {Merchant, User, Push} = require('../models/index')

module.exports = {
  push : async (req, res) => {
    const {title, body} = req.body
    const push          = {title, body}
    let messages        = []

    // Get all push tokens from users
    await User.findAll()
    .then(users => {
      users.forEach(user => {
        if (user.push_token) {
          if (Expo.isExpoPushToken(user.push_token)) {
            messages.push({
              to    : user.push,
              sound : `default`,
              title : title,
              body  : body
            })
          }
        }
      })
    })
    .catch(e => {
      console.log(`Error fetching users in controller/push.js:`, e)
    })

    // Get all push tokens from merchants
    await Merchant.findAll()
    .then(merchants => {
      merchants.forEach(merchant => {
        if (merchant.push_token) {
          if (Expo.isExpoPushToken(merchant.push_token)) {
            messages.push({
              to    : merchant.push,
              sound : `default`,
              title : title,
              body  : body
            })
          }
        }
      })
    })
    .catch(e => {
      console.log(`Error fetching merchants in controller/push.js:`, e)
    })

    const chunks = expo.chunkPushNotifications(messages)
    let tickets  = []

    await (async () => {
      for (chunk of chunks) {  
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk)
          tickets.push(...ticketChunk)
        } catch (e) {
          console.log(`Error sending push notification: `, e)
        }
      }
    })()

    // Add push to database
    Push.create(push)
    .then(push => {
      return res.status(200).send({
        success : true,
        message : `Successfully created push notification`
      })
    })
    .catch(e => {
      console.log(`Error creating push notification: `, e)
      return res.status(500).send({
        success : false,
        message : `Failed to create push notification`
      })
    })
  }
}