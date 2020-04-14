const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const routes    = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/', routes);

app.listen(3000, () => console.log('Server running in port 3000'));