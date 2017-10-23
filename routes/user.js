const express = require('express');
const router = require('express-promise-router')();
const passport = require('passport');
const passportconf = require('../passport');

const { validateBody, schemas } = require('../helpers/routeHelper');
const UserController = require('../controllers/user');

router.route('/signup')
    .post(validateBody(schemas.authSchema), UserController.signUp);

router.route('/signin')
    .post(UserController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt', { session: false }), UserController.secret);

module.exports = router;