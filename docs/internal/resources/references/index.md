---
shortTitle: References
title: References
---

Basically just a Cheat Sheet for using and Interacting with our API.

--- 

# POST Methods

## Available Endpoints

<Route method="POST" path="/bot/:botid" auth /> 

---

###### Acceptable Parameters (BODY)
| Field     | Type        | Description                                                                        |
| --------- | ----------- | ---------------------------------------------------------------------------------- |
| servers   | `String`    | Server Count for the Provided Bot.                                                 |
| shards    | `String`    | Shard Count for the Provided Bot.                                                  |

--- 

###### Acceptable HEADERS
| Field     | Type        | Description                                                                        |
| --------- | ----------- | ---------------------------------------------------------------------------------- |
| authorization   | `String`    | Server Count for the Provided Bot.                                           |
| Content-Type    | `String`    | Shard Count for the Provided Bot.                                            |

---

# GET Methods

## Available Endpoints

<Route method="GET" path="/user/:userID" /> 

<Route method="GET" path="/bot/:botID" /> 

---

###### Get User Data
| Field     | Type        | Description                                                                                         |
| --------- | ----------- | --------------------------------------------------------------------------------------------------- |
| nickname  | `String`    | Nickname for the User on our Website.                                                 |
| about     | `String`    | Some information about the User.                                                   |
| certified_dev | `Boolean` | The users IBL Certified Dev Status.                                                                   |
| developer | `Boolean`    | The users Developer Status (Bot Dev).                                                               |
| staff     | `Boolean`    | If the User is IBL Staff (True or False).                                                               |
| website   | `String`     | Link to the Users Personal Website/Portfolio.                                                               |
| github     | `String`    | Link to the Users GitHub Page or Organization.                                                               |

--- 

###### GET Bot Data
| Field     | Type        | Description                                                                                         |
| --------- | ----------- | --------------------------------------------------------------------------------------------------- |
| name      | `String`    | Discord Username of the Bot.                                                         |
| tags      | `String`    | List of the Bots Tags (Moderation etc).                                                   |
| prefix    | `String`    | The Bots Prefix used to trigger Discord Messages.                                                                   |
| owner     | `String`    | Username of the Bots Main Owner/Developer.                                                               |

---
