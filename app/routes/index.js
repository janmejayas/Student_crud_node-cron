const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/register',userController.register);
router.post('/login',userController.login);
router.post('/userupdate/:id',userController.updatedUser);
router.get('/showuser/:id',userController.showUser);
router.get('/showalluser',userController.showAllUser);
router.delete('/deleteuser/:id',userController.DeleteUser);






module.exports = router;


module.exports = router;