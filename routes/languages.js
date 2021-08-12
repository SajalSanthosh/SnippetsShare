const express = require("express");
const router = express.Router();

const language = require("../models/languages");
const passport = require("passport");

function IsLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

router.get("/", (req, res, next) => {
  language.find((err, languages) => {
    if (err) {
      console.log(err);
    } else {
      res.render("languages/index", {
        title: "Languages",
        dataset: languages,
        user: req.user,
      });
    }
  });
});

router.get("/add", IsLoggedIn, (req, res, next) => {
  res.render("languages/add", { title: "Add a new language", user: req.user });
});

router.post("/add", IsLoggedIn, (req, res, next) => {
  language.create(
    {
      name: req.body.name,
    },
    (err, newLanguage) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/languages");
      }
    }
  );
});

// GET handler for Delete operations
router.get("/delete/:_id", IsLoggedIn, (req, res, next) => {
  language.remove({ _id: req.params._id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/languages");
    }
  });
});

// GET handler for Edit operations
router.get("/edit/:_id", IsLoggedIn, (req, res, next) => {
  language.findById(req.params._id, (err, languages) => {
    if (err) {
      console.log(err);
    } else {
      res.render("languages/edit", {
        title: "Edit a Code",
        languages: languages,
        user: req.user,
      });
    }
  });
});

// POST handler for Edit operations
router.post("/edit/:_id", IsLoggedIn, (req, res, next) => {
  language.findOneAndUpdate(
    { _id: req.params._id },
    {
      name: req.body.name,
    },
    (err, updatedCode) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/languages");
      }
    }
  );
});

module.exports = router;
