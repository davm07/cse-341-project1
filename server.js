const express = require('express');

const mongodb = require('./db/database');
const app = express();

const port = process.env.PORT || 3000;

app.use('/', require('./routes/index'));

mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`App listening on port ${port}`);
          });
    }
})