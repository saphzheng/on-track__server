const fs = require('fs');
const axios = require('axios');
const { v4: uuid } = require('uuid');

// '/user' => get list of all users
// placeholder - this returns a users info
const index = (req, res) => {
    const accessToken = req.headers.authorization.split(' ')[1];
    axios.get("https://dev-3av77v7a.us.auth0.com/userInfo", {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    }).then(response => {
        res.send(response.data);
    }).catch(error => {
        res.send(error.message);
    });
}

module.exports = {
    index
}