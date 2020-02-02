var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var mail = require('nodemailer');





var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  
});




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/contact', { title: 'Basic expressjs website: contact' });
});

router.post("/send", function(req, res, next) {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var subject = req.body.subject;
  var message = req.body.message;

  //req.check('fname').isEmail()
  //req.checkBody('fname', '').notEmpty();

  var sql = "INSERT INTO persons (firstname, lastname, email, subject, message) VALUES (?, ?, ?, ?, ?)";
  //res.location();
  var query = mysql.format(sql, [fname, lname, email, subject, message]);
  con.query(query, function (err, res) {
    if(err) throw err;
    
  });
  //res.render('pages/contact', { title: 'inserted' });
  res.redirect('/contact');
  //req.flash('info', 'invalid username or password');
  var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'gaiyaobed94@gmail.com',
      pass:'gaiya1994'
    }
  });

  var mailOptions = {
    from: email,
    to:'gaiyaobed94@gmail.com',
    name:lname, 
    subject: subject,
    text: message,
    html: name + subject
  };
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/contact');
    }else {
      console.log('send');
      res.redirect('/contact');
      

    }
  });

});


module.exports = router;
