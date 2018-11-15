const db = require('../../db.js');
var VerifyToken = require('./verifyToken.js');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../../config.js'); // get config file

exports.login = function (req, res) {

    db.Users.findOne({ where: { email: req.body.email } }).then(user => {
        //if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');
        
        // check if the password is valid
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

        // if user is found and password is valid
        // create a token
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({ auth: true, token: token });
    }).catch(err => res.status(400).json({ error: true, message: err}));
    
    
};

exports.register = function (req, res) {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);

    db.Users.create({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    }).then(user => {
        //if (err) return res.status(400).json("There was a problem registering the user`.");

        // if user is registered without errors
        // create a token
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });

        res.json({ auth: true, token: token });
    }).catch(err => res.status(400).json({ error: true, message: err}));
    
};


exports.logout = function (req, res) {
    res.json({ auth: false, token: null });  
};

