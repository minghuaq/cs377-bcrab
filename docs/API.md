# API Reference

The api is available at `/api`

## API Endpoints

### Chat

`/api/chat/`
Gets an LLM powered completion from provided chain of messages.

#### POST

Provide user/ai messages in body ordered from oldest to newest.

```json
{
    "messages": [
        {
            "message": string,
            "isAI": boolean
        },
        ...
    ]
}

```

returns an LLM response. See [https://openrouter.ai/docs/responses](https://openrouter.ai/docs/responses) for details.

### Chat `[id]`

`/api/chat/[id]`

Gets or stores chat messages based on `[id]`

#### GET

Returns a list of chat messages ordered from oldest to newest from the given chat id.

```json
{
    "messages": [
        {
            "messageID": int,
            "dialogId": string,
            "userId": string,
            "message": string,
            "isAI": boolean,
            "timestamp": string // ISO formated date string
        },
        ...
    ]
}
```

#### POST

Puts a new message in the database.

```json
{
    "dialogID": string,
    "message": string,
    "isAI": boolean
}

```

Responds with the id of the created message and associated dialog.

```json
{
    "dialogID": string,
    "messageID": string
}

```

### History List

`/api/chat/history/list`

Get all user chat histories

#### GET

Returns a list of chat message histories, each with chat history ordered from oldest to newest.

```json
{
    "chatHistory": [
        {
            "id": string, //dialogID
            "userId": string,
            "messages": [
                {
                    "messageID": int,
                    "dialogId": string,
                    "userId": string,
                    "message": string,
                    "isAI": boolean,
                    "timestamp": string
                },
                ...
            ]
        },
        ...
    ]
}
```

### Dev Create User

`/api/dev/create-user`

Only enabled in development environments. Creates a dummy user in the database for testing and debugging purposes.

#### GET

Provide a user object with desired email, name, and image to be used for the user.

```json
{
    "user": {
        "email": string,
        "name": string,
        "image": string
    }
}
```

responds with 200 if the provided email was already found or was successfully created, returns 500 on failure to create desired user.
