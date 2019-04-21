const express = require('express');
const app = express();
const router = require('./routes');

app.use('/', router);

const port = 5000;
app.listen(process.env.PORT || port, () => {
    console.log('server is now onine...');
});
