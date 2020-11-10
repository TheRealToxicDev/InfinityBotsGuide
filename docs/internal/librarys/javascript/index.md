---
title: JavaScript Library
---

## paradiseapi.js

This is our official library used for interacting with the Paradise API.

---

## Support

* [Discord](https://paradisebots.net/join)

* [GitHub](https://github.com/ParadiseBotList/paradisebotsapi.js)

* [Website](https://paradisebots.net)

* [Bug Report](https://paradisebots.net/bug)

---

## Installation
`npm i paradiseapi.js@latest`

or

`npm i paradiseapi.js@1.0.8`

or

`npm i paradiseapi.js --save`

---

## Hard Coded Install
Append the Line below to your package.json
```
    "paradiseapi.js": "^1.0.8",
```

• Save and profit

---

## Ratelimits
You can POST Server and Shard Count stats once every 5 minutes

###### Rate Limit Structure
| Route	| Request | Requests Allowed Per 5 Minutes | Punishment if Exceeded
|--------------|----------|--------------|--------------|
/api/v1/bot/:botid | POST | 1 | 1 Hour Block

---

###### Response
Status | Code | Description
|---------- |----------|----------|
Too Many Requests | 429 | Your are being ratelimited, 1 request per 5 mins.
Not Found | 404 | Can't find `server_count`.
Forbidden | 403 | Authorization header not found, Go generate a auth token for your bot or make sure it's valid!
Bad Request | 400 | `server_count` is not a integer.
Not Found | 404 | Bot not found!
Bad Request | 400 | Incorrect authorization token.
Not Found | 403 | Authorization header not found, Go generate a auth token for your bot or make sure it's valid!
Bad Request | 400 | `shard_count` is not a integer.
Forbidden | 403 | Bot is not approved.
OK | 200 | Your Stats Have Been Posted.

---


## Posting Stats

<Route method="POST" path="/api/v1/bot/:botid" auth /> 

###### Constructor
```
PBL(client, token)
```

###### Arguments
Parameter | Type | Optional | Description
|----------|----------|----------|----------|
token | String | No | The API Auth Token found on your bots page.
client | Snowflake | No | The Client ID for the bot you want to post stats to.

--- 

###### Discord.js - v12 Example
```js
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "!";
const PBL = require("paradiseapi.js")
const pbl = new PBL(client.user.id,"bot-auth-token")

client.on("ready", () => {
console.log(`Logged in as ${client.user.tag}.`)
setInterval(() => {
/* Here is where we Post the stats to the Site (Only use one of these) */
   pbl.post(client.guilds.cache.size) /* Will `POST` server count*/
   //pbl.post(client.shard.count) /* Will `POST` shard count*/
   //pbl.post(client.guilds.cache.size, client.shard.count) /* Will `POST` server and shard count*/
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

###### Discord.js v12 - Example (Wtih event handler
```js
module.exports = class extends EventClass {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
  const PBL = require("paradiseapi.js")
  const pbl = new PBL("BOT_ID_HERE","AUTH_TOKEN_HERE")
  
/* Here is where we Post the stats to the Site (Only use one of these) */
   pbl.post(client.guilds.cache.size) /* Will `POST` server count*/
   //pbl.post(client.shard.count) /* Will `POST` shard count*/
   //pbl.post(client.guilds.cache.size, client.shard.count) /* Will `POST` server and shard count*/
    }
}
```

###### ([Discord Akairo](https://www.npmjs.com/package/discord-akairo)) - Example
```js
const Discord = require('discord.js');
const { Listener } = require('discord-akairo');
const request = require('superagent');
const fetch = require("node-fetch")
const Client = new Discord.Client()


module.exports = class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
  const PBL = require("paradiseapi.js")
  const pbl = new PBL("BOT_ID_HERE","AUTH_TOKEN_HERE")
  
/* Here is where we Post the stats to the Site (Only use one of these) */
   pbl.post(client.guilds.cache.size) /* Will `POST` server count*/
   //pbl.post(client.shard.count) /* Will `POST` shard count*/
   //pbl.post(client.guilds.cache.size, client.shard.count) /* Will `POST` server and shard count*/
    }
}
```

---

## Getting Stats

<Route method="GET" path="/api/v1/bots/:botid" />

###### Constructor
```
PBL()
```

###### Arguments
Parameter | Type | Optional | Description
|----------|----------|----------|----------|
username | String | Yes | The bots username.
botid | Snowflake | Yes | The bots ID.
owner | Snowflake | Yes | The bot owners ID.
additionalOwners | String | Yes | The IDs of all additional owners (if any).
Prefix | String | Yes | The bots listed prefix(s).
shortDescription | String | Yes | The bots short description (Shown on cards).
longDescription | String | Yes | The bots long description (Can be markdown).
votes | Number | Yes | The bots total number of upvotes.
usersVoted | String | Yes |IDs of the last 10 users who voted (May return less).
totalUsersVoted | Number | Yes | Total number of Individual Users who have voted (Each user = 1).
server | String | Yes | Link to the bots support server.
website | String | Yes | Link to the bots website.
github | String | Yes | Link to the bots github.
donate | String | Yes | Link to donate to the bot.
tags | String | Yes | List of the bots tags.
library | String | Yes | The library the bot was made with.
servers | Number | Yes | Number of total servers the bot is in.
shards | Number | Yes | Number of total shards the bot has.


--- 

###### Discord.js - Example
```js
const Discord = require("discord.js")
const client = new Discord.Client()
const prefix = "!";
const PBL = require("paradisebotsapi.js")
const stats = new PBL()
 
client.on("ready", () => { // ready listenerconsole.log(`Logged in as ${client.user.tag}`)}) 
client.on("message", message => { // message listener
    if(message.author.bot) return;
    if(message.channel.type !== "text") return;
    if(!message.content.toLowerCase().startsWith(prefix)) return;
    if(message.content == (prefix + "ping")){
        message.reply(`Pong ${client.ws.ping}ms`)
    }
     if(message.content == (prefix + "stats")){
        stats.get(client.user.id, function(data){
        let embed = new MessageEmbed()
        .setTitle(data.username)
        .setDescription(`Vote here: https://paradisebots.net/api/v1/bots/${client.user.id}`)
        .addField("Total Votes", data.votes);

        message.channel.send(embed)
        })
    }
})
 
 
client.login("token")
```

--- 

## User-Made Libraries

We currently don't endorse any unofficial libraries for the API, but if you think you could contribute to our current libraries check out our github repos and maybe submit a PR. If you think we should endorse your unofficial (user-made) library for a language we don't already support hit us up in our API Support Discord Channel or DM  a Web Admin

* [Github Link](https://github.com/ParadiseBotList/paradisebotsapi.js)

* [Discord Link](https://paradisebots.net/join)
