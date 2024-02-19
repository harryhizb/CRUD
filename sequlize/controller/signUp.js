const bcrypt = require('bcryptjs');
const userModel = require('../Models/userModel');

const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    
    // check if user email already exists
    const userExist = await userModel.findOne({ where: { email } });
    if (userExist) {
      res.status(400).json({ message: 'Email already taken' });
      return;
    }

    // hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // create a new user
    const newUser = await userModel.create({
      name,
      email,
      password: hashPassword, // Fix the variable name here
    });

    const { id, name: userName, email: userEmail, userType, imageUrl } = newUser.toJSON();

    res.status(201).json({
      id,
      email: userEmail,
      name: userName,
      userType,
      imageUrl,
      message: 'User registered successfully',
    });
  } catch (error) {
    console.log('Error in signUp ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    signUp,
}
