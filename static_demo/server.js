const express = require('express');
const path = require('path');
const server = express();

// users-list/static_demo + ./assets
const distFolder = path.join(__dirname, './assets');
// distFolder = users-list/static_demo/assets

server.use(express.static(distFolder));

server.listen(9090);
