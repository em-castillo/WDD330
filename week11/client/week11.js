import Auth from "./auth.js";
import Function from "./authHelpers.js";

makeRequest('login', 'POST', {
    password: 'user1',
    email: 'user1@email.com'
    });