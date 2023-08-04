const Product = require("../model/Product.model");

//import thư viện mysql2
const mysql = require('mysql2');

//hàm kết nối với mysql 
const connection = mysql.createConnection({
    //host của máy
    host: '127.0.0.1',
    // user của mysql
    user: 'root',
    //passwowrd trong mysql
    password: 'quanbui2003',
    //schemas chứa database
    database: 'duan'
  });

//sử dụng mô hình mvc
class BookController {
  indexSp(req, res, next) {
    Product.find({})
      .then((products) => {
        res.render("listBook", { products });
      })
      .catch((err) => {
        console.error('Error fetching product data: ' + err);
        res.status(500).send('Error fetching product data');
      });
  }

  indexAdd(req, res, next) {
    res.render('addProduct');
  }
  //add dữ liệu 
  addProduct(req, res) {
    //gọi ra các thành phần product
    // const { name, price, description,image} = req.body;
    const name = req.body.name
    const price = req.body.price
    const description = req.body.description
    const image = req.body.image
    const quantity = req.body.quantity
    const id_category = req.body.id_category
 

    // const imagePath = req.file.path;

    //dùng câu lệnh insert into product () values ()
    const query = 'INSERT INTO duan.product (name, price, description, image , quantity ,id_category) VALUES (?, ?, ?, ?, ?,?)';
    //gọi thành phần đó vào trong values ()
    const values = [name, price, description, image,quantity,id_category];
  
    //hàm connect thêm vào bảng và báo lỗi khi k thêm được
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error inserting product data: ' + error);
        res.status(500).send('Error inserting product data');
      } else {
        const id_product = results.insertId;
        console.log('Product data inserted successfully.'+ id_product);
        //  res.status(200).json({ message: 'product data inserted successfully', id_product : id_product });
         res.redirect('/product/getall'); // Render the detail page for the newly added product
      }
    });
  }
  updateProduct(req, res) {
    //lấy id của sản phẩm muốn xóa
    const productId = req.params.id;
    const { name, price, description,image,quantity } = req.body;
   
  
    //hàm update thif sử dụng set lấy mới dữ liệu nhập vào rồi update
    const query = 'UPDATE product SET name = ?, price = ?, description = ?, image = ? , quantity = ? WHERE id = ?';
    const values = [name, price, description, image, quantity];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error updating product data: ' + error);
        res.status(500).send('Error updating product data');
      } else {
        console.log('Product data updated successfully.');
        res.status(200).send('Product data updated successfully');
      }
    });
  }

  deleteProduct(req, res) {
    const id_product = req.params.id_product;
    
    const query = 'DELETE FROM product WHERE id_product = ?';
    const values = [id_product];
    
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error deleting product data: ' + error);
        res.status(500).send('Error deleting product data');
      } else {
        if (results.affectedRows === 0) {
          console.error('Product with id ' + id_product + ' not found');
          res.status(404).send('Product not found');
        } else {
          console.log('Product data deleted successfully.');
          res.status(200).json({success : true , message: 'product data inserted successfully', userId : id_product });
         
        }
      }
    });
  }
  
  



  
  getall(req, res, next) {
    const query = 'SELECT * FROM product';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching product data: ' + error);
        res.status(500).send('Error fetching product data');
      } else {
        const products = results;
        res.json({ data : products }); // Output as JSON in a list format
        console.log(products);
      }
    });
  }
  
  
  getAPI(req, res, next) {
    const query = 'SELECT * FROM product';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching product data: ' + error);
        res.status(500).json({ error: 'Error fetching product data' });
      } else {
        res.json({
          products: results,
        });
      }
    });
  }
  


}

module.exports = new BookController();
