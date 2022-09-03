const express = require('express');
const app = express();
const path = require('path');



//  view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));


app.get('/', async (req, res) => {
  res.send('hello');
});

//404 page
// app.use((req, res, next) => {
//   res.status(404).render('404Page');
// });


module.exports = app;
