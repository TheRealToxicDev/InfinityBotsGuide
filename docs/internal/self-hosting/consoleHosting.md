---
title: Console Hosting
---

---
## Invite Your Bot
If you've been diligently following the previous pages of the guide, you should have a bot application set up. However, it's not in any servers yet. So how does that work?

---

Before you're actually able to see your bot in your own (or other) servers, it needs to be added using a special invite link that can be created using your bot application's client ID.

---

## Bot invite links

The basic version of one such link looks like this:

```
https://discordapp.com/oauth2/authorize?client_id=123456789012345678&scope=bot
```

The structure of the url is quite simple:

* The first part is just Discord's standard structure for authorizing an OAuth2 application (such as your bot application) for entry to a Discord server.
* The second part that says `client_id=...` is to specify _which_ application you want to authorize. You'll need to replace this part with your client's ID in order to create a valid invite link. 
* Lastly, the third part which says `scope=bot` specifies that you want to add this application as a Discord bot.

---

## Creating and using your own invite link

As mentioned above, you'll need to replace the `client_id` parameter with your client's ID in order to generate your invite link. To find your app's ID, head back to the [My Apps](https://discordapp.com/developers/applications/me) page under the "Applications" section once again and click on your bot application.

Insert your app's ID into the link template and then access it in your browser. You should see something like this (with your bot's username and avatar):

![Bot Authorization field](https://github.com/discordjs/guide/blob/master/guide/images/A8l70bj.png?raw=true)

Choose the server you want to add it to and click "Authorize". Do note that you'll need the "Manage Server" permission on a server in order to be able to add your bot there. This should then present you a nice confirmation message:

![Bot authorized](https://github.com/discordjs/guide/blob/master/guide/images/BAUsjyg.png?raw=true)

Congratulations! You've successfully added your bot to your Discord server. It should show up in your server's member list


---

## Self Host Guide

Following the [Ninja Setup Guide](https://docs.ninjabot.site/internal/self-hosting/setup/) Your next step/s after Installing Dependencies are as Follow

1. In the bots Directory Navigate to `assets > jsons > config.json`

2. Add your Token and a Timeout for how often the Bot Changes its Playing Status.

3. Setup Music, Link Shortening and Youtube Search Commands. (Google API Key Required.)
    * Navigate to `music.js` scroll down to Line **112** and add your API Key where asked.
```jsx harmony
					key: "" // Your Google API Key goes here.
```

4. Follow Step 3 for the `commands/youtube.js` && `commands/shortenurl.js` as well.


5. Finally, we are gonna create a File inside the Bot Directory and name it `.env` Inside this file is where we plave the bots Environment Variables (`process.env`), Inside this file add the Following Lines.
```jsx harmony
TOKEN=YOUR-TOKEN-HERE
PROJECT_DOMAIN=WEBSITE-LINK(USED FOR GLITCH HOST)
PORT=3002 (USED FOR GLITCH HOST)
GOOGLEAPI=YOUR-API-KEY
```

* Please make sure you replace `YOUR-TOKEN-HERE` with your actual Bot Token and `YOUR-API-KEY` with your actual Youtube/Google API Key.

* Once you are Done that you are ready to run the bot. 
   + Open the Command Prompt in your Bot Directory using the Steps Provided in the [Ninja Setup Page](https://docs.ninjabot.site/internal/self-hosting/setup/)
     + Run the command `node Main.js` once the bot Starts you are Ready to [invite it](#invite-your-bot).

---
