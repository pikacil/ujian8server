const express = require('express')
const router = express.Router()
const userController = require('../Controller/userController')

router.route('/').post(userController.insertuser);
router.route('/').get(userController.getuser);

router.route('/:id').get(userController.getuserByID);
router.route('/:id').patch(userController.updateuser);
router.route('/:id').delete(userController.deleteuser);
router.route('/username/:username').get(userController.getUserByUsername);
router.route('/email/:email').get(userController.getUserByEmail);
router.route('/phone/:phone').get(userController.getUserByPhone);
router.route('/address/:address').get(userController.getUserByAddress);

module.exports =router