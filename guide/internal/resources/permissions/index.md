---
title: Permissions
---

Paradise Bots implements a permission schema that naturally extends discord's native functionality. A set of permissions can be applied to each role or member of a server.

Below is a table of all current permissions and their hexidecimal values:

###### Discord Permission Flags

| Permission                 | Value                  | Description                                                 |
| -------------------------- | ---------------------- | ----------------------------------------------------------- |
| ADMINISTRATOR              | 0x0001                 | Grants all permissons |
| VIEW_PUBLIC_LOGS           | 0x0002                 | Allows viewing any action logged in a public channel |
| VIEW_PRIVATE_LOGS          | 0x0004                 | Allows viewing any action logged in the guild |
| REVERT_LOG_ACTIONS         | 0x0008                 | Allows reverting any reversible action logged |
| ADD_AUTO_RESPONSE          | 0x0010                 | Allows adding auto responses to the guild |
| IGNORE_AUTO_RESPONSE_QUOTA | 0x0020                 | Allows adding auto responses, even if the quota has been reached  |
| EDIT_ANY_AUTO_RESPONSE     | 0x0040                 | Allows editing any user's auto responeses |
| DELETE_ANY_AUTO_RESPONSE   | 0x0080                 | Allows deleting any user's auto responses |
| VIEW_SETTINGS              | 0x0100                 | Allows viewing paradise settings for the guild |
| MANAGE_SETTINGS            | 0x0200                 | Allows modifying Paradise settings for the guild |
| EXEC_PURGE_CMD             | 0x0400                 | Allows executing the purge command |

<Alert type="info">

The default permission value for a new guild is `0x112`.

</Alert>

---

###### Paradise Bot Permission Schema

| Permission                 | permLevel              | Description                                                 |
| -------------------------- | ---------------------- | ----------------------------------------------------------- |
| USER                       | 0                      | Allows execution of user level commands (help, ping etc) |
| BOT_DEV                    | 1                      | Allows for certification (User ID is stored internally) |
| BOT_OWNER                  | 2                      | Allows editing pages of all bots owned by the user. |
| MODERATOR                  | 3                      | Allows execution of some moderation commands |
| ADMINISTRATOR              | 4                      | Allows execution of all moderation commands |
| BOT_APPROVERS              | 5                      | Allows execution of all queue commands |
| PARADISE_DEV               | 6                      | Allows controlling, editing & reverting changes of the Paradise Bots project. |
| PARADISE_STAFF             | 7                      | Allows execution of staff level commands (check etc) |
| PARADISE_OWNER             | 8                      | Allows controlling, editing & reverting changes of the Paradise Bots project. |

---

## Permission Hierarchy

The default role, `@everyone`, always holds the default base permissions for every member of the guild. Each role and user can optionally have additional permissions associated with it.

---

## Calculating a User's Permissions

Paradise Bots permissions are only additive. Therefore a user's permissions are always exactly the union of their personal permissions and the permissions of every role that they have:
