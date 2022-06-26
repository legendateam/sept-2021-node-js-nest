My Api

##WebSocket
**HOST**: `http:localhost:2500`

---

### Listen for join in chat

---

###Event: `join`

Emmit Data:

| Property | Description 
|----------|----------|
|`access_token`| access user token |  
|`roomName` | room name, id html element <div>|

Example:

````angular2html
access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGdtYWkuY29tIiwicGFzc3dv'
roomName: 3
````

---

On Data:

| Property | Description |
|----------|----------|
|message |user connection message |
|name | user name|

Example: 
````angular2html
message: 'Joined to room Tommy'
name: 'Tommy'
````

---

###Event: `createMessage`

Emmit Data:

| String | Description |
|--------|--------|
| text | text of chat |

Example: 
```angular2html
textarea.value // chat text
```

---

On Data:

|Property| Description|
|-----|----|
|text|hello guys!|
|name|Tommy|

---
