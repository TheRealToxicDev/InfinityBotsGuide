---
title: Paradise Github Setup
---

# Setting Up Paradise GitHub
Follow the following steps to set up Paradise with any repo on GitHub.

# Discord
* Go to the channel you want events in for a repo
* Say `pbg!init REPO`, where REPO can be username/repo, a GitHub url... more usage info at `pbg!help init`
* If the repository is private, make sure you tell Paradise that with `pbg!init REPO private`

# GitHub
* Go to the GitHub repo you want to have events for Click Settings > Webhooks
* Set URL to `https://githubbot.paradisebots.net/github`
* Leave Content-Type to whatever it's set - Paradise supports both options
* Select the events you want to emit to the channel
* Click "Add Webhook"
* Now you can test the webhook by, in Settings > Webhooks, scrolling down the webhook, finding the webhook pointing to the url mentioned above, clicking it, and clicking the "Test" button on the right. Keep in mind you will need to have a commit or two in the repo, as it will simulate a push request.
