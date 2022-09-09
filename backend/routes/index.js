var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// attach axios header if jwtToken exist in localStorage
// supposed to be in frontend with axios.
// (function() {
//   const token = localStorage.getItem("jwtToken")
//   console.log("jwtToken in immediate executed function: ", token)
//   if (token) {
//       axios.defaults.headers.common['Authorization'] = token;
//   } else {
//       axios.defaults.headers.common['Authorization'] = null;
//       /*if setting null does not remove `Authorization` header then try     
//         delete axios.defaults.headers.common['Authorization'];
//       */
//   }
// })();

module.exports = router;
