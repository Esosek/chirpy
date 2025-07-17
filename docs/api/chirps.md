# Chirps

Chirps are short messages submitted by users.

## Resource
```JSON
{
    "id": "47c9fa78-e9ba-4775-ae58-f763a90eff5b",
    "createdAt": "2025-07-17T09:44:11.338Z",
    "updatedAt": "2025-07-17T09:44:11.338Z",
    "userId": "1d00d065-ed01-40ba-a83e-7d86de53e199",
    "body": "If you're committed enough, you can make any story work."
}
```

## Public Endpoints

### `GET /api/chirps`

- Returns a list of all chirps

**Queries**:

- `authorId` - The user ID for which to retrieve chirps

### `GET /api/chirps/{chirpId}`

- Returns a specific chirp

## Authorized Endpoints

[How to Authenticate](./authentication.md)

### `POST /api/chirps`

- Create a new chirp for logged in user
- JSON body:

```JSON
{
	"body": "Content of the chirp"
}
```

### `DELETE /api/chirps/{chirpId}`

- Deletes a specified chirp
