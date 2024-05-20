// routes/index.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
     res.redirect('/admin');
    // const { username, password } = req.body;
    // User.findOne({ username })
    //     .then(user => {
    //         if (!user) {
    //             req.flash('error_msg', 'No user found');
    //             return res.redirect('/login');
    //         }

    //         bcrypt.compare(password, user.password, (err, isMatch) => {
    //             if (isMatch) {
    //                 req.session.user = user;
    //                 res.redirect('/admin'); // Redirect to /admin after successful login
    //             } else {
    //                 req.flash('error_msg', 'Incorrect password');
    //                 res.redirect('/login');
    //             }
    //         });
    //     });
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
