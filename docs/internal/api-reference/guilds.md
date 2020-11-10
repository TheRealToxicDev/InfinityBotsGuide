---
title: Guilds List
---

The Guild object is used to gain context into Discord guilds (servers), including information such as id, icon, and name.

## Guild Object

Same as discord [guild](https://discordapp.com/developers/docs/resources/guild#guild-object) object, with two additions:

###### Json Params

| Field  | Type                                          | Description                                                                   |
| ------ | --------------------------------------------- | ----------------------------------------------------------------------------- |
| has_ninja | boolean | whether Ninja is a member of the guild |
| ninja_admin | boolean | whether the user is a Ninja Bot admin in the guild |

###### Guild Example

```json
{
  "features": [
    "ANIMATED_ICON",
    "BANNER",
    "VANITY_URL",
    "INVITE_SPLASH"
  ],
  "name": "discord.py",
  "owner": false,
  "icon": "3aa641b21acded468308a37eef43d7b3",
  "id": "336642139381301249",
  "permissions": 104189632,
  "has_ninja": true,
  "ninja_admin": false
}
```

## Get List of Guilds

<Route method="GET" path="/guilds" auth />

Returns a list of [guild](#guild-object) objects that the user is a member of.
