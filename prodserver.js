/* eslint-disable */
const express = require('/usr/local/share/.config/yarn/global/node_modules/express');

const app = express();
const PORT = 4000;

app.use((req, res, next) => {
  if(req.headers['x-forwarded-proto'] == "http"){
    res.redirect("https://" + req.headers['host'] + req.url);
  } else {
    return next();
  }
});

app.use(express.static(__dirname + '/'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}.`);
});
