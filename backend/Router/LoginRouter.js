const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const loginSchema = require('../models/LoginSchema');
const LoginRouter = express.Router();

LoginRouter.post('/', async (req, res) => {
  const { user_name, password } = req.body;
  try {
	if (user_name && password) {
  	const oldUser = await loginSchema.findOne({ user_name });
  	if (!oldUser)
    	return res
      	.status(400)
      	.json({ success: false, error: true, message: "User doesn't Exist" });
  	const isPasswordCorrect = await bcrypt.compare(
    	password,
    	oldUser.password
  	);
  	if (!isPasswordCorrect)
    	return res
      	.status(400)
      	.json({ success: false, error: true, message: 'Incorrect password' });

  	const token = jwt.sign(
    	{
      	userId: oldUser._id,
      	userRole: oldUser.role,
      	userName: oldUser.user_name,
    	},
    	'secret_this_should_be_longer',
    	{ expiresIn: '1h' }
  	);
  	console.log('token', token);
  	return res.status(200).json({
    	success: true,
    	error: false,
    	token: token,
    	expiresIn: 2400,
    	loginId: oldUser._id,
    	userRole: oldUser.role,
    	userName: oldUser.user_name,
  	});
	} else {
  	return res.status(400).json({
    	success: false,
    	error: true,
    	message: 'All fields are required!',
  	});
	}
  } catch (error) {
	res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = LoginRouter;

