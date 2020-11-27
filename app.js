const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const routes = require('./routes');

app.use(bodyParser.json());
app.use('/pokemons', routes);

const port = process.argv.slice(2)[0] || 3000;

app.listen(port, () => {

    console.log(`Server listening on port ${port}`);
});
