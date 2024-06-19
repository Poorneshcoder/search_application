const express = require('express');
const router = express.Router();

const itemController = require('../controller/itemController');

// get all items

router.get('/', itemController.getData);

// add items
router.post('/',itemController.addData);

// delete items
router.delete('/:id',itemController.deleteData);


module.exports = router;