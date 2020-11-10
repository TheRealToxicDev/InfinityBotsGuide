---
title: Command Updates
---

Ninja Bots Documentation website is not an Official Commands List, Ninjas offical commands list can be found [here](http://ninjabot.site/commands) this page is used for Command Updates, Information Etc.

# Yoda Command Update
<Alert type="warning">

<strong>Warning:</strong> The Yoda command is currently buggy and a Temporary Fix can be found below for Self-Hosted versions, a proper Fix will be implemented in the v0.9.6.5 Public Release (Currently Private)

</Alert>

# Yoda Command Fix

<Collapse>

```jsx
const Discord = require("discord.js");
const bot = new Discord.Client();
const snek = require('node-fetch');

exports.run = async (client, message, args) => {

const speech = args.join(' ');

if (speech.length < 2) return message.channel.send(`${message.author.username} You must supply text for Yoda. Yes.`);

const text = await snek(`http://yoda-api.appspot.com/api/v1/yodish?text=${encodeURIComponent(speech.toLowerCase())}`)

.then(res => res.text()) // expecting a json response
.then(body => {
message.channel.send(JSON.parse(body).yodish).catch(console.error);
});
}
```

</Collapse>

##
