# Chirps

Chirps are short messages submitted by users.

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
