---
title: Ninja Setup
---

## Installing Node.js

To use Ninja, you'll need to install Node.js, You can do so using the link below!
- [Download Node](https://nodejs.org/).

---

## Using Node.js
Now that you have Node installed you should have access to the NPM Commands in Your Terminal or Command Prompt.

---

### NPM Commands
```jsx harmony
+ npm help -> Will show you the Help Message and a List of Commands.

+ npm install -> Install all Dependencies in the Pakcage.json
```

---

## Setting up a project folder

1. Like any other project, you should have a dedicated folder for this, in order to keep it organized and manageable.

2. Download the [Ninja Bot Source](https://github.com/TheRealToxicDev/Ninja-Bot-Source/archive/v1.0.0.zip) and Extract it to a location of your choice.

3. Once you're done making the folder, open it up nad proceed to the Command Prompt Steps.

---

## Opening the command prompt

If you're on Linux, you can quickly open up the terminal with `Ctrl + Alt + T`.

If you're on Windows and aren't familiar with opening up the command prompt, simply do the following:

1. Open your bot project folder.
2. Hold down the `Shift` key and right-click inside of the folder.
3. Choose the "Open command window here" option.

It should then open up a window with a black background. It's a bit unattractive, but we'll talk about using better, more powerful tools in a different part of the guide.

---

## Using the command prompt

1. With the command prompt open, run the `node -v` command to make sure you've successfully installed Node.js. If you see something like <branch version="11.x" inline>`v8.0.0`</branch><branch version="12.x" inline>`v12.0`</branch>, great! If not, go back and try installing again.

2. The next command you'll be running is `npm install`. This command will install all dependencies from the `package.json` file for you

3 (Optional). If you recieve any errors with installing packages The `npm audit fix` command will attempt to update the outdated or broken dependencies based on the newest version available.

---

## Creating your bot

Now that you've installed Node, you're almost ready to start coding! The next step you need to take is setting up an actual Discord bot application via Discord's website.

It's incredibly easy to create one. The steps you need to take are as follows:

1. Open up [the Discord website](https://discordapp.com/) and [login](https://discordapp.com/login).
2. Hover over the "Developers" drop-down menu and click on the [Developer Portal](https://discordapp.com/developers/applications/) link.
3. Click on the "New Application" button.
4. Enter a name and optionally select a team (if you want the bot to belong to one). Then confirm the pop-up window by clicking the "Create" button.

You should see a page like this:

![Successfully created application](https://discordjs.guide/assets/img/create-app.cb14ef85.png)

You can optionally enter a name, description, and avatar for your application here. Once you've saved your changes, you can move on by selecting the "Bot" tab in the left pane.

![Create a bot UI](https://discordjs.guide/assets/img/create-bot.dff0f01e.png)

Click the "Add Bot" button on the right and confirm the pop-up window by clicking "Yes, do it!". Congratulations, you're now the proud owner of a shiny new Discord bot! You're not quite done, though.

---

## Your token

<Alert type="error">

This section is very important, so pay close attention. It explains what your bot token is, as well as the security aspects of it.

</Alert>

After creating a bot user, you'll see a section like this:

![Bot application](https://discordjs.guide/assets/img/created-bot.c422fe87.png)

In this panel, you can give your bot a snazzy avatar, set its username, and make it public or private. You can access your token in this panel as well, either by revealing it or simply pressing the "Copy" button. When we ask you to paste your token somewhere, this is the value that you need to put in. Don't worry if you do happen to lose it at some point; you can always come back to this page and copy it again.

---

### What is a token, anyway?

A token is essentially your bot's password; it's what your bot uses to login to Discord. With that being said, **it is vital that you do not ever share this token with anybody, purposely or accidentally**. If someone does manage to get a hold of your token, they can use your bot as if it were theirs—this means they can perform malicious acts with it.

---

### Token leak scenario

Let's imagine that you have a bot on over 1,000 servers, and it took you many, many months of coding and patience to get it on that amount. Your token gets leaked somewhere, and now someone else has it. That person can:

* Spam every server your bot is on;
* Attempt to DM spam as many users as they can;
* Attempt to delete as many channels as they can;
* Attempt to kick or ban as many server members as they possibly can;
* Make your bot leave all of the servers it has joined.

All that and much, much more. Sounds pretty terrible, right? So make sure to keep your token as safe as possible!

<Alert type="error">

If you ever somehow leak your token (commit it to a repository, post it in a support channel, etc.) or otherwise see your bot in danger, return to this page and regenerate a new one. Your old token will become invalid and you'll need to update it with the new one in all the places you've used it.

</Alert>
