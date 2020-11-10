---
title: Bot Object
---

###### Bot Structure
Field |	Type	| Description | Status
|--------------|----------|--------------|--------------|
botid | Snowflake | The id of the bot | **ACTIVE**
username | String | The username of the bot | **ACTIVE**
library	| String | The library of the bot | **COMING SOON**
prefix	| String | The prefix of the bot | **ACTIVE**
shortDescription | String | The short description of the bot | **ACTIVE**
longDescription | String | The long description of the bot. Can contain Markdown | **ACTIVE**
tags | String | The tags of the bot. Featured on the bot page | **COMING SOON**
website | String | The website url of the bot | **COMING SOON**
server | String | The support server invite code of the bot | **COMING SOON**
github | String | The link to the github repo of the bot | **COMING SOON**
owner | String | The owner of the bot. | **ACTIVE**
additionalOwners | Array | The additional owners or staff of the bot. | **ACTIVE**
servers	| Number | The bots Guild Count | **ACTIVE**
shards	| Number | The bots Shard Count | **ACTIVE**

---

## Get Bots
Use this endpoint to gain information about bots

### API | Specified Bot
<Route method="GET" path="/api/v1/bots/:botid" />

### API | All Approved Bots
<Route method="GET" path="/api/v1/bots/list" />

---

## Get Bots (Unfiltered)
Use this endpoint to gain information about different bots as well as a list of all approved **and** unapproved bots
<Route method="GET" path="/bots/search" />

---

## Get Bot
Use this endpoint to gain information about a specific bot
<Route method="GET" path="/bots/{bot.id}" />

---
###### Query String Params
Field	| Type | Description | Default
|--------------|----------|--------------|--------------|
limit	| Number	| The amount of bots to return. Max. 500	| 50
offset	| Number	| Amount of bots to skip	| 0
search	| String	| A search string in the format of field: value field2: value2 |
sort	| String	| The field to sort by. Prefix with - to reverse the order |
fields	| String	| A comma separated list of fields to show. |	All fields

---

###### Response fields
Field	| Type	| Description
|--------------|----------|--------------|
results	| Array of bot objects | The matching bots
limit	| Number	| The limit used
offset	| Number	| The offset used
count	| Number | The length of the results array
total | Number | The total number of bots matching your search
