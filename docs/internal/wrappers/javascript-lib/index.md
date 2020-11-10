---
shortTitle: JavaScript
title: JavaScript Library
---

This is our official library used for interacting with the Infinity Bots API.

> Maintainer: Dexter#1337

## Installation
`npm i infinity-api@latest`

or

`npm i infinity-api@1.0.6`

or

`npm i infinity-api --save`

---

## Hard Coded Install
Append the Line below to your package.json
```
    "infinity-api": "^1.0.6",
```

• Save and profit

---

## Ratelimits
You can POST Server and Shard Count stats once every 5 minutes

###### Rate Limit Structure
| Route	| Request | Requests Allowed Per 5 Minutes |
|--------------|----------|--------------|
/api/bots/:botid | POST | 1 | 

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
IBL(client, token, true)
```

---

###### POST Example (discord.js v12)
```js
const { Client } = require("discord.js") //import client from discord api @12.3.1
const client = new Client();
const IBL = require("infinity-api"); // we import our api
const stats = new IBL(client.user.id, "bot-auth-token", true) // true means give response
const prefix = "!";
 
client.on("ready", () => { // ready listener
    console.log(`Logged in as ${client.user.tag}`)
    setInterval(() => { 
        stats.post(client.guilds.cache.size)
        // stats.post(client.guilds.cache.size, client.shard.count) // for shards
        }, 3e5)
    }) 
client.on("message", message => { // message listener
    if(message.author.bot) return;
    if(message.channel.type !== "text") return;
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    if(message.content == (prefix + "ping")){
        message.reply(`Pong ${client.ws.ping}ms`)
    }
})
 
 
client.login("token")
```

---

## Get method

<Route method="POST" path="/api/bots/:botid/info" /> 

---

###### Response
Status | Code | Description
|---------- |----------|----------|
Success | 200 | Your stats have been posted |
Not Found | 404 | Couldn't find bot |
Rate Limit | 429 | You're being ratelimited one request per 5 mins |
Internal Server Error | 500 | An error occurred, Contact Dexter |
Error | 400 | Something went wrong here. | 

---

###### Constructor
```
IBL()
```

###### GET Example (discord.js v12) 
```js
const { Client } = require("discord.js") //import client from discord api @12.3.1
const client = new Client();
const IBL = require("infinity-api"); // we import our api
const stats = new IBL()
const prefix = "!";
 
client.on("ready", () => { // ready listenerconsole.log(`Logged in as ${client.user.tag}`)}) 
client.on("message", message => { // message listener
    if(message.author.bot) return;
    if(message.channel.type !== "text") return;
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    if(message.content == (prefix + "ping")){
        message.reply(`Pong ${client.ws.ping}ms`)
    }
     if(message.content == (prefix + "stats")){
        stats.bot((data) => { // ID should be string
        let embed = new MessageEmbed()
        .setTitle(data.bot_name)
        .setDescription(`
        Votes: ${data.votes},
        Support: ${data.support},
        Website: ${data.website},
        Donate: ${data.donate},
        Certified: ${data.certified},
        Tags: ${data.tags}
        Prefix: ${data.prefix},
        Library: ${data.library},
        Description: ${data.short_desc},
        Servers: ${data.servers},
        Shards: ${data.shards},
        Staff: ${data.staff}
        `)
        .setFooter(`Bot created by ${data.owner}`)
        })
        message.channel.send(embed)
    }
 
    if(message.content == (prefix + "user")){
        stats.user("userID", (data) => { // ID should be string
        let embed = new MessageEmbed()
        .setTitle(`${data.username}'s Stats`)
        .setDescription(`
        Developer: ${data.developer},
        Staff: ${data.staff},
        Certified: ${data.certified},
        About: ${data.about},
        `)
        })
        message.channel.send(embed)
    }
})
 
 
client.login("token")
```
---
