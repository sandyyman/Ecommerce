const express = require('express');
const router = express.Router();
const { userRegisterValidate, userProfileUpdateValidate } = require('../utils/userValidation')
const { register, loginUser, updateUser, getUserInfo, logoutUser, updateAddress } = require('../controllers/userController');

//creating user
router.post('/register', userRegisterValidate, register);

//login of user
router.post('/login', loginUser);

//update user
router.put('/updateUser', userProfileUpdateValidate, updateUser);

//user info
router.get('/userinfo', getUserInfo);

//logout user
router.delete('/logout', logoutUser);

//update address
router.put('/update-address', updateAddress)



module.exports = router;