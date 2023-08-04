// Import thư viện mysql2
const mysql = require('mysql2');

// Hàm kết nối với MySQL
const connection = mysql.createConnection({
  // Host của máy
  host: '127.0.0.1',
  // User của MySQL
  user: 'root',
  // Password trong MySQL
  password: 'quanbui2003',
  // Schemas chứa database
  database: 'duan'
});

class CategoryController {
  // Constructor to initialize the MySQL connection
  constructor() {
    connection.connect((err) => {
      if (err) {
        console.error('Error connecting to MySQL: ' + err.stack);
        return;
      }
      console.log('Connected to MySQL database as ID: ' + connection.threadId);
    });
  }

  // Method to render the list of products (index page)
  indexSp(req, res, next) {
    Category.find({})
      .then((products) => {
        res.render("listBook", { products });
      })
      .catch((err) => {
        console.error('Error fetching product data: ' + err);
        res.status(500).send('Error fetching product data');
      });
  }

  // Method to render the add product page
  indexAdd(req, res, next) {
    res.render('addProduct');
  }

  // Method to add a new category to the database
  addCategory(req, res) {
    // Gọi ra các thành phần Account
    const name = req.query.name;
    const image = req.query.image;

    // Dùng câu lệnh INSERT INTO ... VALUES (...) để thêm dữ liệu vào bảng
    const query = 'INSERT INTO duan.category(name, image) VALUES (?, ?)';
    const values = [name, image];

    // Thực hiện câu lệnh INSERT
    connection.query(query, values, (error, results) => {
      if (error) {
        console.error('Error inserting category data: ' + error);
        res.status(500).send('Error inserting category data');
      } else {
        const id_category = results.insertId;
        console.log('Category data inserted successfully with id: ' + id_category);
        res.status(200).json({ message: 'Category data inserted successfully', id_category: id_category });
      }
    });
  }
  getAPI(req, res, next) {
    const query = 'SELECT * FROM duan.category';
  
    connection.query(query, (error, results) => {
      if (error) {
        console.error('Error fetching product data: ' + error);
        res.status(500).json({ error: 'Error fetching product data' });
      } else {
        res.json({
          category: results,
        });
      }
    });
  }
}

module.exports = new CategoryController();
