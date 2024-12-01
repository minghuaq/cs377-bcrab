# API Reference

The api is available at `/api/[version]`

## V0 API Endpoints

### Chat

`/api/chat/`
<!-- TODO -->

#### GET

<!-- TODO -->

#### POST

<!-- TODO -->

### Chat [id]

`/api/chat/[id]`
<!-- TODO -->

#### GET

<!-- TODO -->

#### POST

<!-- TODO -->

## V1 API Endpoints

### New Chat

`/api/v1/chat/new`

#### POST

Create a request for a new chat dialog.

Creates a new chat dialog with an initial message. The initial message gets stored in the database and issued a new dialog uuid. From here the client can be redirected to a new chat page using the dialog uuid to continue chatting.

##### Payload

`{
    "message": String // The user's message
}`

##### Response

200:
`{
    "dialogID": String // The UUID of the newly created chat
}`

### Get Chat [id]

`/api/v1/chat/[id]`

`id`: UUID of the desired chat

#### GET

Fetches the chat with the given dialog UUID given in `id`. If the last message in the chain was a user, then an LLM response will

##### Response

200:
`{
    "messages" : [
        {
            "messageID": int, // ID of this message
            "message": String, // Contents of the message
            "isAI": false, // Wether the given message was from the user, or LLM
            "timestamp": "2024-11-30T21:25:11.954Z" // Timestamp the message was recieved by the server.
        },
        // ...
    ]
}`

#### POST

Send a new user message. Response will contain the generated LLM response.

##### Payload

`{
    "message": String // The user's message
}`

##### Response

200:
`{
    "dialogID": String // The UUID of the newly created chat
}`
