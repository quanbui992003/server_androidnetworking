const express = require('express')
const routes = express.Router();
const multer = require("multer");
const productController = require('../Controller/Product')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Thay đổi đường dẫn này thành đường dẫn thực tế đến thư mục "uploads"
  },
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + "." + file.originalname.split(".")[1]
    );
  },
});

const upload = multer({
  storage,
});

routes.get('/listProduct', productController.indexSp);
routes.get('/addProduct', productController.indexAdd);
routes.post('/addProduct',productController.addProduct);
routes.post('/updateProduct',productController.updateProduct);
routes.get('/getall',productController.getall);
routes.get('/api',productController.getAPI);
routes.delete('/deleteAdmin/:id_product',productController.deleteProduct);
module.exports = routes;