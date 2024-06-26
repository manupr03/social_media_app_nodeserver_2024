const express = require('express');
const router = express.Router();
const { getUsers,addUser,loginUser,registerUser } = require('../controllers/userControllers');


router.get('/users',getUsers);
router.post('/users',addUser);
router.post('/users/login' ,loginUser)
router.post('/users/register',registerUser)

module.exports = router;
