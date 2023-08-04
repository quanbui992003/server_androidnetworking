const express = require('express')
const route = express.Router()
const accountController =require("../Controller/Account")

route.use(express.json())
route.post('/addAccount',accountController.addAccount);
route.post('/Login',accountController.loginAccount);
route.post('/Update',accountController.updateAccount);
route.delete('/Delete/:id_user',accountController.deleteAccount);
module.exports = route