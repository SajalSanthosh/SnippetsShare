// Import express and create a router
const express = require('express');
const router = express.Router();
// Add reference to the models
const Code = require('../models/codes');
const language = require('../models/languages');
const passport = require('passport');

function IsLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

// Add GET for index
router.get('/', (req, res, next) => {
    Code.find((err, codes) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('codes/index', { title: 'Browse Codes', dataset: codes, searchquery: '', user: req.user });
        }
    })
});

// Search
router.post('/', (req, res, next) => {
    Code.find({ "title": { "$regex": req.body.query} }, (err, codes) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('codes/index', { title: 'Browse Codes', dataset: codes, searchquery: req.body.query, user: req.user });
        }
    })
});

router.get('/add', IsLoggedIn, (req, res, next) => {
    // Get list of languages
    language.find((err, languages) => {
        if (err) {
            console.log(err);
        }
        else {
            res.render('codes/add', { title: 'Add a New Code', languages: languages, user: req.user });
        }
    }).sort({ name: -1 });
});

router.post('/add', IsLoggedIn, (req, res, next) => {
    Code.create({
        name: req.body.name,
        title: req.body.title,
        language: req.body.language
    }, (err, newCode) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/codes');
        }
    });
});

// GET handler for Delete operations
router.get('/delete/:_id', IsLoggedIn, (req, res, next) => {
    Code.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/codes')
        }
    })
});

// GET handler for Edit operations
router.get('/edit/:_id', IsLoggedIn, (req, res, next) => {
    Code.findById(req.params._id, (err, code) => {
        if (err) {
            console.log(err);
        }
        else {
            language.find((err, languages) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.render('codes/edit', {
                        title: 'Edit a Code',
                        code: code,
                        languages: languages, 
                        user: req.user
                    });
                }
            }).sort({ name: 1 });
        }
    });
});

// POST handler for Edit operations
router.post('/edit/:_id', IsLoggedIn, (req,res,next) => {
    Code.findOneAndUpdate({_id: req.params._id}, {
        name: req.body.name,
        title: req.body.title,
        language: req.body.language,
        status: req.body.status
    }, (err, updatedCode) => {
        if (err) {
            console.log(err)
        }
        else {
            res.redirect('/codes');
        }
    });
});

module.exports = router;