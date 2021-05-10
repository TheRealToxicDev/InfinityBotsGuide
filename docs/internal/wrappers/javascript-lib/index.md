---
shortTitle: infinityapi.js
title: Our NPM Module/Wrapper
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
IBL(client, token)
```

---

###### POST Example
```js
const { Client } = require('discord.js');
const client = new Client();
const ibl = require('IBL-api');

const Poster = new ibl.Poster(client, "AuthToken");

Poster.autoPost({
  botID: "474745745457", // Your botID
  timerLoop: 300000 // This is in MS, this is default to 5 minutes
}, true);

client.login("token");
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
const ibl = require('IBL-api'); // We import our api

// Coming Soon!

```

## Custom Webhooks

###### Constructor
```
const IBL = new infinity("botID", "botAuth", {webPort: 3001, webPath: "/IBLhook", webAuth: "Auth you placed in custom webhooks"});
```

###### Webhooks
```js
const infinity = require("ibl-api") // We import our api

// Coming Soon!

```
