---
shortTitle: node-fetch
title: Using Node-Fetch
---
On top of our Official Modules you can use a variety of other packages to interact with our API, node-fetch is one of those packages.

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

<Route method="POST" path="bot/:botid" auth /> 

###### Responses
Status | Code | Description
|---------- |----------|----------|
Success | 200 | Your stats have been posted |
Not Found | 404 | Couldn't find bot |
Rate Limit | 429 | You're being ratelimited one request per 5 mins |
Internal Server Error | 500 | An error occurred, Contact Dexter |
Error | 400 | Something went wrong here. | 

---

###### POST Example - (discord.js v12)
```js
const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");


client.on('ready', () => { 

console.log('Bot is online and ready');

let server_count = client.guilds.cache.size;
let api_key = 'SOME_TOKEN' // Your infinity bot list API Token generated on the bots page (owner only)

fetch(`https://api.infinitybotlist.com/bot/:botID`, {
            method: "POST",
            headers: {
                "authorization": "api_key",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                servers: server_count,
                shards: 1 // Not required for bots in less then 1k Guilds
            })
        }).then(async res => console.log(await res.json()))
});

client.login("Some_Bot_Token") // Not required (Remember this is an example)
```

---

###### POST Example - (discord.js v11)
```js

const Discord = require('discord.js');
const client = new Discord.Client();
const fetch = require("node-fetch");


client.on('ready', () => { 

console.log('Bot is online and ready');

let server_count = client.guilds.size;
let api_key = 'SOME_TOKEN' // Your infinity bot list API Token generated on the bots page (owner only)

fetch(`https://api.infinitybotlist.com/bot/:botID`, {
            method: "POST",
            headers: {
                "authorization": "api_key",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                servers: server_count,
                shards: 1 // Not required for bots in less then 1k Guilds
            })
        }).then(async res => console.log(await res.json()))
});

client.login("Some_Bot_Token") // Not required (Remember this is an example)
```

---

## Get method

<Route method="GET" path="/bot/:botid" /> 

---

###### Response
Status | Code | Description
|---------- |----------|----------|
Success | 200 | GET Request Successful |
Not Found | 404 | Couldn't find bot |  

---

###### GET Example
```js
const fetch = require("node-fetch")
fetch(`https://api.infinitybotlist.com/bot/:botID`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async res => console.log(await res.json()));
```

---
