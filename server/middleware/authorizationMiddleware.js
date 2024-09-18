const { auth, requiredScopes } = require("express-oauth2-jwt-bearer");
// Middleware to validate authentication and authorization matches with Auth0
const checkJwt = auth({
  audience: "https://catcouture/api",
  issuerBaseURL: `https://dev-4byfagrcflsqo0mx.us.auth0.com/`,
});

const checkScopes = requiredScopes("read:reports");

module.exports = {
  checkJwt,
  checkScopes,
};
