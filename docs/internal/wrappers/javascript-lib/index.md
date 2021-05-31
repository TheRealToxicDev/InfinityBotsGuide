---
shortTitle: infinityapi.js
title: Javascript Wrapper
---

This is our Official NPM Module used for interacting with the Infinity Bots API.


## Installation
`npm i infinityapi.js@latest`

---

## Ratelimits
You can POST Server and Shard Count stats once every 5 minutes

###### Rate Limit Structure
| Route	| Request | Requests Allowed Per 5 Minutes |
|--------------|----------|--------------|
/bot/:botid | POST | 3 | 

---

---

## POST Method

<Route method="POST" path="/bot/:botid" auth /> 

###### Responses
Status | Code | Description
|---------- |----------|----------|
Success | 200 | Your stats have been posted |
Not Found | 404 | Couldn't find bot |
Rate Limit | 429 | You're being ratelimited one request per 5 mins |
Internal Server Error | 500 | An error occurred, Contact Toxic Dev |
Error | 400 | Something went wrong here. | 


###### Constructor
```
InfinityBots(client, token)
```

---

###### Required Params
Parameter | Type | Optional | Description
|--------------|----------|--------------|--------------|
token | String | No | The API Auth Token found on your bots page.
client | Snowflake | No | The Client ID for the bot you want to post stats to.
shards | Number | No | The Bots shard count to be posted to our website. | 0 will be replaced with `N/A`.
servers | Number | No | The Bots Server count to be posted to our website. | 0 will be replaced with `N/A`.

---

###### POST Example

```js
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "ibltest.";
const InfinityBots = require("infinityapi.js")
const ibl = new InfinityBots(client.user.id, "bot-auth-token")

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

## GET Bot

<Route method="GET" path="/bot/:botid" /> 

### Constructor

```
Infinity(botID)
```

###### Arguments
Parameter | Type | Optional | Description
|--------------|----------|--------------|--------------|
name | String | Yes | The bots username.
owner | Snowflake | Yes | The bot owners ID.
additional_owners | Array | Yes | The IDs of all additional owners (if any).
Prefix | String | Yes | The bots listed prefix(s).
short | String | Yes | The bots short description (Shown on cards).
long | String | Yes | The bots long description (Can be markdown).
votes | Number | Yes | The bots total number of upvotes.
invites | Number | Yes | The bots total number of invites.
views | Number | Yes | Total Number of the bots Page Views.
certified | Boolean | Yes | The bots certified status | true or false.
premium | Boolean | Yes | The bots premium status | true or false.
votes | Number | Yes | The bots total number of upvotes.
support | String | Yes | Link to the bots support server.
website | String | Yes | Link to the bots website.
github | String | Yes | Link to the bots github.
donate | String | Yes | Link to donate to the bot.
invite | String | Yes | The bots full invite link.
tags | String | Yes | List of the bots tags.
library | String | Yes | The library the bot was made with.
servers | Number | Yes | Number of total servers the bot is in.
shards | Number | Yes | Number of total shards the bot has.


--- 

###### GET Example
```js
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "!";
const IBL = require("infinityapi.js")
const stats = new IBL()
 
client.on("message", message => { 
    if(message.author.bot) return;
    if(message.channel.type !== "text") return;
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    if(message.content == (prefix + "ping")){
        message.reply(`Pong ${client.ws.ping}ms`)
    }
     if(message.content == (prefix + "stats")){
        stats.get_bot(client.user.id, function(data){
        let embed = new MessageEmbed()
        .setTitle(data.name)
        .addField("Total Votes", data.votes);

        message.channel.send(embed)
        })
    }
})
 
 
client.login("token")
```

---

## GET User

<Route method="GET" path="/user/:userid" /> 

###### Constructor
```
IBL(userID)
```

---

###### GET Example
```js
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "!";
const IBL = require("infinityapi.js")
const stats = new IBL()
 
client.on("message", message => {
    if(message.author.bot) return;
    if(message.channel.type !== "text") return;
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    if(message.content == (prefix + "ping")){
        message.reply(`Pong ${client.ws.ping}ms`)
    }
     if(message.content == (prefix + "stats")){
        stats.get_user("SOME_USER_ID", function(data){
        let embed = new MessageEmbed()
        .setTitle(`Info about ${data.username}`)
        .setDescription('The info here is fetched from the Infinity Bots API')
        .addField("Bio", data.about, true)
        .addField("Certified User?", data.certified_dev, true)
        .addField("GitHub", data.github, true)
        .addField("Website", data.website, true)
        .setFooter(`Requested By: ${message.author.username}`)
 
        message.channel.send(embed)
        })
    }
})
 
 
client.login("token")
```


---

## Custom Webhooks
* Coming Soon
