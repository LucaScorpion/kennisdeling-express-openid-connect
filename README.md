# Kennisdeling express-openid-connect

Quick start:

```shell
cd express
npm start
```

Azure app registrations:

https://portal.azure.com/#view/Microsoft_AAD_RegisteredApps/ApplicationsListBlade

## Gotcha's

### Client secret

`OIDC_CLIENT_SECRET` moet de secret _value_ zijn, niet de secret _id_.

### Response mode

`authorizationParams.response_mode` moet `form_post` zijn, anders kan je een error krijgen dat de URL te lang is omdat hij alles in query parameters wil stoppen.

### Callback route

`routes.callback` moet matchen met de `authorizationParams.redirect_uri`, anders kan de middleware de auth response niet afhandelen.

### requiresAuth

Als je je eigen `requiresAuth` check meegeeft, moet je daarin minstens checken of de user niet al authenticated is: `!req.oidc.isAuthenticated()`.
