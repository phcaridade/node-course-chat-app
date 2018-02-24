const express = require('express');
const path = require('path');

const publicpath = path.join(__dirname, '..',  'public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicpath));

var server = app.listen(port, () => {
    var host = server.address().address
    var port = server.address().port
    console.log(`Server is up at ${host} port ${port}`);
});
