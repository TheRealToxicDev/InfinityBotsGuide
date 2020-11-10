---
shortTitle: References
title: API Reference
---

Our API is a HTTPS/REST for general operations such as sending POST requests and receiving GET requests

---

###### Base URL

```markdown
https://paradisebots.net/api/v1
```

---

## Authentication
To access our API you need to authorize yourself, this can be done by using your Paradise Bot List Token. Your token can be obtained from your Bots Edit page.
Authentication is performed with the Authorization HTTP header in the format Authorization: `TOKEN`

* Note: The token used below is an example, Please generate your own from your bots edit page.

---

###### Example Authorization Header

<GatewayRoute
  eventName="request_authorization"
  room="OAuth"
  sentFrom="verified_bot"
  requiresAuthorization
  payload={{
    token: {
      type: "Autorization: 6jShKo4HBuMIEdTeFUk1",
      description: "Authorization Token & Header"
    }
  }}
/>
