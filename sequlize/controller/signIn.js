const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserModel = require('../Models/userModel'); 

require('dotenv').config();


const createToken = (user, res, next) => {
	const { id, email, name, imageUrl } = user;
	const payload = {
		_id: id,
		email,
		name,
		imageUrl,
	};
	console.log(payload);
	// create a token
	jwt.sign(
		payload,
		process.env.JWT_SECRET,
		{
			expiresIn: '365d',
		},
		(err, token) => {
			// Error Create the Token
			if (err) {
				res.status(500);
				console.log(err);
				next(new Error('Unable to generate Token.'));
			} else {
				// Token Created
				res.json({
					token,
				});
			}
		},
	);
};

const SignIn = (req, res, next) => {
	const { email, password } = req.body;
	// Find user with the passed email
	UserModel.findOne({ email }).then(user => {
		if (user) {
			// if email found compare the password
			bcryptjs.compare(password, user.password).then(result => {
				// if password match create payload
				if (result) {
					createToken(user, res, next);
				} else {
					res.status(400);
					next(new Error('Invalid Password'));
				}
			});
		} else {
			// Wrong Password.
			res.status(400);
			next(new Error('No User Exist With This Email'));
		}
	});
};

module.exports = { 
    SignIn
};
