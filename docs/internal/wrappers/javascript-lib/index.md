---
shortTitle: infinityapi.js
title: Javascript Wrapper
---

This is our Official NPM Module used for interacting with the Infinity Bots API.


## Installation
`npm i infinityapi.js@latest`

---

## Hard Coded Install
Append the Line below to your package.json

• Replace `VERSION` with whichever Version you want to use

```
    "infinityapi.js": "^VERSION",
```

• Save and profit

---

## Ratelimits
You can POST Server and Shard Count stats once every 5 minutes

###### Rate Limit Structure
| Route	| Request | Requests Allowed Per 5 Minutes |
|--------------|----------|--------------|
/api/bots/:botid | POST | 3 | 

---

---

## Post Method

<Route method="POST" path="/api/bots/:botid" auth /> 

###### Responses
Status | Code | Description
|---------- |----------|----------|
Success | 200 | Your stats have been posted |
Not Found | 404 | Couldn't find bot |
Rate Limit | 429 | You're being ratelimited one request per 5 mins |
Internal Server Error | 500 | An error occurred, Contact Dexter |
Error | 400 | Something went wrong here. | 


###### Constructor
```
Infinity(client, token)
```

---

###### Required Params
Parameter | Type | Optional | Description
|--------------|----------|--------------|--------------|
token | String | No | The API Auth Token found on your bots page.
client | Snowflake | No | The Client ID for the bot you want to post stats to.

---

###### POST Example

```js
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "ibltest.";
const Infinity = require("infinityapi.js")
const ibl = new Infinity(client.user.id, "bot-auth-token")

client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}.`)
setInterval(() => {
   ibl.post(client.guilds.cache.size, '0') // Server Count and 0 Shards
  })
}, 300000) //5 Minutes in MS

client.on("message", message => {
    if(message.author.bot) return
    if(message.content == prefix + "ping"){
        message.reply(`Pong! it took ${client.ws.ping}`)
    }
})

client.login("token")

```

---

## Get method
* Coming Soon

---

## Custom Webhooks
* Coming Soon
