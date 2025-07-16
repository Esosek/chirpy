# Authentication

Authorized endpoints requires a JWT present in Authorization header `Bearer {JWT token}`. The lifetime of a JWT is 1 hour a lifetime of a refresh token is 60 days. The user needs to be created first via users resource.

[How to create new user](./users.md##post-apiusers)

## Endpoints

### `POST /api/login`

- Logs in a user
- JSON body:

```JSON
{
    "email": "mloneusk@example.co",
    "password": "45315"
}
```

- Returns JWT `token` and `refreshToken` that are used for authenticating requests and refreshing token.

### `POST /api/refresh`

- Generates a new JWT token for a valid refresh token. Refresh token could be expired or revoked which then requires user to login again
- Requires a refresh token in header `Authorization: Bearer {refreshToken}`
- Returns:

```JSON
{
  "token": "JWT_token"
}
```

### `POST /api/revoke`

- Revokes a refresh token
- Requires a refresh token in header `Authorization: Bearer {refreshToken}`
