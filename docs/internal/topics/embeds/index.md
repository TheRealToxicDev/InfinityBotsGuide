---
title: Bot Embeds
---

Embeds or "Widgets" are images that can display your bots stats on your own website! On this page we will tell you how to access and customise them.

---

## Get Embed

<Route method="GET" path="/bots/{botid}/widget" />

---

## Usage
To use the embed, you can insert the following link as an IFrame or Image into your website / documentation.

* Iframe
```markdown
<Iframe src="https://www.paradisebots.net/bots/:botID/widget"/>
```

* Markdown
```markdown
![](https://www.paradisebots.net/bots/:botID/widget)
```

---

## Preview IFrame

<Iframe src="https://paradisebots.net/bots/746631296515571725/widget" width="250px" height="250px"/>

---

In this example we used just a plain embed which defaults to .svg, We also used a Iframe to display the example
