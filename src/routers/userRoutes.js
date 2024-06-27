const express = require('express');
const router = express.Router();
const {registerUser,loginUser,getUsers,getUserById,addUser,updateUser,deleteUser} = require('../controllers/userControllers');


router.get('/users',getUsers);
router.get('/users/:id',getUserById);
router.post('/users',addUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);
router.post('/users/login' ,loginUser)
router.post('/users/register',registerUser)

module.exports = router;
