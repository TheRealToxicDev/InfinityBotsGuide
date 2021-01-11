---
shortTitle: JavaScript
title: JavaScript Wrapper
---

This is our official javascript library used for interacting with the Infinity Bots API.


## Installation
`npm i infinity-api@latest`

---

## Hard Coded Install
Append the Line below to your package.json
```
    "infinity-api": "^VERSION",
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
IBL(client, token)
```

---

###### POST Example
```js
const IBL = require("infinity-api"); // We import our api
const stats = new IBL("Your BotID", "Your Bot Api token") // Add botID string, And Authorization token from the bot page

    setInterval(() => { 
        stats.postStats("Guilds count" /*, "Shards Count" */) // Post guilds count and shards count
    }, 3e5)
```

---

## Get method

<Route method="GET" path="/api/bots/:botid/info" /> 
<Route method="GET" path="/api/users/:userID" /> 

---

###### Response
Status | Code | Description
|---------- |----------|----------|
Success | 200 | GET Request Successful |
Not Found | 404 | Couldn't find bot |  

---

###### Constructor
```
IBL(client, token)
```

###### GET Example
```js
const IBL = require("infinity-api"); // We import our api
const stats = new IBL("Your BotID", "Your Bot Api token") // Add botID string, And Authorization token from the bot page

// Get Bot Stats
    stats.getStats((data) => {
        console.log(data)
    })

// Get User Stats
    stats.getUser("userID", (data) => {
        console.log(data)
    }
```

## Get method

###### Constructor
```
const IBL = new infinity("botID", "botAuth", {webPort: 3001, webPath: "/IBLhook", webAuth: "Auth you placed in custom webhooks"});
```

###### Webhooks
```js
const infinity = require("infinity-api") // We import our api
const IBL = new infinity("botID", "botAuth", {webPort: 3001, webPath: "/IBLhook", webAuth: "Auth you placed in custom webhooks"}); // We fill requirements

IBL.webhook.on("votes", (vote) => {
    console.log(vote) // Receive vote content
})
IBL.webhook.on("ready", console.log) // Once the webserver start u will get message
IBL.webhook.on("destroyed", console.log) // Any errors will be generated from him
```
