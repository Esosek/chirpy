# Users

Resource that serves for creating and updating users. For a user to be able to [login](./authentication.md) and post [chirps](./chirps.md) they need to be created first.

## Resource
```JSON
{
    "id": "1d00d065-ed01-40ba-a83e-7d86de53e199",
    "createdAt": "2025-07-17T09:42:52.496Z",
    "updatedAt": "2025-07-17T09:42:52.496Z",
    "email": "mloneusk@example.co",
    "password": "password"
    "isChirpyRed": false
}
```

## Public Endpoint

### `POST /api/users`

- Creates a user
- JSON body:

```JSON
{
    "email": "mloneusk@example.co",
    "password": "45315"
}
```

## Authorized Endpoint

### `PUT /api/users`

- Updates user email or password
- JSON body:

```JSON
{
    "email": "mlon@example.com",
    "password": "123444"
}
```
