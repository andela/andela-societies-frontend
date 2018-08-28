const express = require('express');
const logger = require('morgan');
const compress = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('views', 'public');

app.use(compress());
app.use(logger('tiny'));
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});
