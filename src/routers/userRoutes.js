const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getUsers,addUser} = require('../controllers/userControllers');


router.get('/users',getUsers);
router.post('/users',addUser);
// router.put('/users/:id',updateUser);
// router.post('/users/:id',deleteUser);
router.post('/users/login' ,loginUser)
router.post('/users/register',registerUser)

module.exports = router;
