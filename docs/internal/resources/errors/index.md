---
title: Troubleshooting
---

Paradise Bot List uses a Custom Error schema which is provided via the Paradise API. If you find yourself on an error page don't worry just copy the link to the page and reference this docs page for explanations on the error.

---

## Example Link:

<Route method="ERROR" path="/error/?e={error}" />

---

## Example Solution
* For example `e=nolegal` Means our Terms of Service and Privacy Policy Pages don't exist yet.

---

###### API Error Page Schema
| Error Link      | Error Description 
|--------------|----------|
e=unknown | Your bot ID was invalid.
e=verified | That bot was already found on the botlist.
e=unverified | That bot was already found on the botlist. Wait for verification.
e=long | The short description was too long.
e=user | Please logout and login again.
e=invite | Invalid bot invite link provided.
e=owner | The bot is not yours to edit.
e=id | You can't change the bot id.
e=server | You are not in the server, Please join our Server before adding any bots.
e=human | This is not a list of discord users, Please provide a Bot ID not a User ID.
e=js | JS is not supported in the long description.
e=html | HTML is not supported in the long description.
e=notfound | Your bot was not found on the list.
e=nolegal | Our Terms of Service and Privacy Policy are currently a work in progress, Please check back at a later date.
