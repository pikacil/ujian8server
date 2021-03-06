const express = require('express')
const router = express.Router()
const hewanController = require('../Controller/hewanController')

router.route('/')
    .post(hewanController.insertHewan)
    .get(hewanController.getHewan)

router.route('/:id')
    .get(hewanController.getHewanByID)
    .patch(hewanController.updateHewan)
    .delete(hewanController.deleteHewan)

module.exports =router