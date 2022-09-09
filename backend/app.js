const express = require('express');
const app = express();
const path = require('path');

const { userInfoController } = require('./controllers/userInfoController');
const { VisaController } = require('./controllers/VisaController');
const { OnboardingApplicationController } = require('./controllers/onboardingApplicationController');

const userRouter = require('./routes/users');

// cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//  view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(express.json());
app.use(userInfoController);

const publicFolder = path.join(__dirname, 'public');
app.use(express.static(publicFolder));

app.use(userRouter);
app.use(VisaController);
app.use(OnboardingApplicationController);

app.get('/', async (req, res) => {
  res.send('hello');
});

//404 page
// app.use((req, res, next) => {
//   res.status(404).render('404Page');
// });


module.exports = app;
