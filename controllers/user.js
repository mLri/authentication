const JWT = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET } = require('../config/token');

signToken = data => {
    return JWT.sign({
        iss: 'mLri',
        sub: data._id,
        iat: new Date().getTime(),
        exp: new Date().setTime(new Date().getTime() + 1)
    }, JWT_SECRET);
}

module.exports = {

    signUp: async(req, res, next) => {

        const { email, password } = req.value.body;

        //check if there a user with same email
        const foundUser = await User.findOne({ email });
        if(foundUser){
            return res.status(403).json({ error: 'Email is already in use.'});
        }

        //create a new user
        const newUser = new User({ email, password });
        await newUser.save();

        //generate the token
        const token = signToken(newUser);

        //respon token
        res.status(200).json({ token : token});

    },
    signIn: async(req, res, next) => {
        res.json({text: 'signIn page.'});
    },
    secret: async(req, res, next) => {
        res.json({text: 'secret page.'});
    }

}