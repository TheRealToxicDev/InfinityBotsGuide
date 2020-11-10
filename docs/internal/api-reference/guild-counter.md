---
title: Guild Counter
---

The Guild Count endpoint allows for static retrieval of usage statistics about Ninja Bot, including total guilds (servers) the bot is in as well as how many distinct users it serves.

## Get the Count of Guilds and Users

<Route method="GET" path="/guild_count" />

Return number of guilds in which Ninja Bot is a member and the sum of their members.

###### Example Response

```json
{
  "guild_count": 46,
  "user_count": 4094
}
```
