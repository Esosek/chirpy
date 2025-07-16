# Users

Serves for creating and updating users. For a user to be able to [login](./authentication.md) and post [chirps](./chirps.md) they need to be created first.

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
