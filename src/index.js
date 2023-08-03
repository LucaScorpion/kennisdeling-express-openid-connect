const dotenv = require('dotenv');
const express = require('express');
const {auth, requiresAuth} = require('express-openid-connect');
const http = require('http');

// Laad de .env file in.
dotenv.config();

// Maak een express app.
const app = express();

// Configureer de OIDC middleware.
app.use(
    auth({
        clientID: process.env.OIDC_CLIENT_ID,
        clientSecret: process.env.OIDC_CLIENT_SECRET,
        issuerBaseURL: process.env.OIDC_ISSUER_BASE_URL,
        baseURL: process.env.OIDC_BASE_URL,
        secret: process.env.OIDC_SECRET,
        authorizationParams: {
            response_type: 'code',
            response_mode: 'form_post',
            scope: 'openid email',
            redirect_uri: `${process.env.OIDC_BASE_URL}/auth/callback`,
            // Zorg dat je altijd het account selectie scherm krijgt.
            // prompt: 'select_account',
        },
        routes: {
            login: '/auth/login',
            logout: '/auth/logout',
            // Let op dat dit matcht met de redirect_uri uit de authorization_params!
            callback: '/auth/callback'
        },

        // Optioneel:
        // authRequired: false,
        // errorOnRequiredAuth: true
    }),
    // Als authRequired false is:
    // requiresAuth((req) => req.path.startsWith('/api') && !req.oidc.isAuthenticated())
);

// Serveer statische bestanden uit de public map.
app.use(express.static('public'));

app.get('/api/me', (req, res) => {
    res.send(req.oidc.user);
});

// Redirect alles (wat niet gevonden is) naar '/'.
app.use((req, res) => {
    res.redirect('/');
});

// Start de server.
http.createServer(app).listen(3000);
