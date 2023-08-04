const express = require('express')
const route = express.Router()
const CategoryController = require("../Controller/Category")

route.use(express.json())
route.post('/addCate',CategoryController.addCategory);
route.get('/getApi',CategoryController.getAPI);
// route.post('/Update',CategoryController.updateAccount);
// route.delete('/Delete/:id_user',CategoryController.deleteAccount);
module.exports = route