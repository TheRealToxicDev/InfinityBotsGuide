---
title: User Object
---

###### User Structure
| Field	| Type | Description | Status
|--------------|----------|--------------|--------------|
id | Snowflake | The id of the user | **ACTIVE**
username | String |	The username of the user | **ACTIVE**
discriminator	| String	| The discriminator of the user | **ACTIVE**
avatar?	| String	| The avatar hash of the user's avatar | **INACTIVE**
defAvatar	| String	| The cdn hash of the user's avatar if the user has none | **INACTIVE**
bio?	| String	| The bio of the user | **INACTIVE**
banner?	| String	| The banner image url of the user | **INACTIVE**
social	| Object	| The social usernames of the user | **COMING SOON**
social.youtube?	| String	| The youtube channel id of the user | **COMING SOON**
social.reddit?	| String	| The reddit username of the user | **COMING SOON**
social.twitter? |	String	| The twitter username of the user | **COMING SOON**
social.instagram?	| String	| The instagram username of the user | **COMING SOON**
social.github?	| String	| The github username of the user | **COMING SOON**
color?	| String	| The custom hex color of the user | **COMING SOON**
supporter	| Boolean	| The supporter status of the user | **COMING SOON**
certifiedDev	| Boolean	| The certified status of the user | **COMING SOON**
mod	| Boolean	| The mod status of the user | **COMING SOON**
webMod	| Boolean	| The website moderator status of the user | **COMING SOON**
admin	| Boolean	| The admin status of the user | **COMING SOON**

< Alert type="info">

**NOTE:** "COMING SOON" for Mod or Admin related Users **does not** mean that our website isn't moderated, This says COMING SOON because the Admin Tags for User Profiles are a work in progress

</Alert>

---

## Get User
Use this endpoint to gain information about a particular user
<Route method="GET" path="/user/{user.id}" />

