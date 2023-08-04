const Account = require("../model/account");

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


  class AccountController {
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
    addAccount(req, res) {
      // Gọi ra các thành phần Account
      const email = req.body.email;
      const pass = req.body.pass;
      const name = req.body.name;
      const phone = req.body.phone;
      const role = 'user';
      // const { email, pass } = req.query;
      console.log(email, pass);
    
      
      // Dùng câu lệnh INSERT INTO ... VALUES (...) để thêm dữ liệu vào bảng
      const query = 'INSERT INTO duan.account(email, pass,name,phone,role) VALUES (?, ?, ?, ?,?)';
      const values = [email, pass,name,phone,role];
    
      // Kết nối cơ sở dữ liệu và thực hiện câu lệnh INSERT
      connection.query(query, values, (error, results) => {
        if (error) {
          console.error('Error inserting accounts data: ' + error);
          res.status(500).send('Error inserting accounts data');
        } else {
          const accountId = results.insertId;
          console.log('Account data inserted successfully with id: ' + accountId);
          res.status(200).json({ message: 'Account data inserted successfully', accountId: accountId });
        }
      });
    }
   loginAccount(req, res) {
      const email = req.body.email;
      const pass = req.body.pass;
    
      const query = 'SELECT * FROM  duan.account WHERE email = ? AND pass = ?';
      const values = [email, pass];
      
      connection.query(query, values, (error, results) => {
        if (error) {
          console.error('Error retrieving user data: ' + error);
          res.status(500).json({ message: 'Error retrieving user data' });
        } else {
          if (results.length > 0) {
            const id_user = results[0].id_user; // Lấy giá trị của trường "id" trong kết quả truy vấn
            const userRole = results[0].role; // Lấy giá trị của trường "role" trong kết quả truy vấn
            if (userRole === 'admin') {
              // Người dùng là quản trị viên - Đăng nhập thành công với vai trò quản trị viên
              console.log('Admin logged in successfully.');
              res.status(200).json({ message: 'Admin login successful', id_user: id_user });
            } else {
              // Người dùng là người dùng thường - Đăng nhập thành công với vai trò người dùng
              console.log('User logged in successfully.');
              res.status(200).json({ message: 'User login successful', id_user: id_user });
            }
          } else {
            // Thông tin đăng nhập không hợp lệ
            console.log('Invalid login credentials.');
            res.status(401).json({ message: 'Invalid login credentials' });
          }
        }
      });
    }

// Import module connection từ nơi bạn đã tạo kết nối tới cơ sở dữ liệu MySQL.
// Ví dụ: const connection = require('./db_connection');

 updateAccount(req, res) {
  // Lấy thông tin tài khoản từ đối tượng req.body
  const id_user = req.params.id_user; // Lấy ID từ đối tượng req.body để xác định tài khoản cần cập nhật
  const name = req.body.name;
  const phone = req.body.phone;

  // Dùng câu lệnh UPDATE để cập nhật thông tin tài khoản
  const query = 'UPDATE duan.account SET name = ?, phone = ? WHERE id_user = ?';
  const values = [id_user,name, phone];

  // Kết nối cơ sở dữ liệu và thực hiện câu lệnh UPDATE
  connection.query(query, values, (error, results) => {
    if (error) {
      console.error('Error updating account data: ' + error);
      res.status(500).json({ message: 'Error updating account data' });
    } else {
      console.log('Account data updated successfully.');
      res.status(500).json({ message: 'Account data updated successfully' });
     
    }
  });
}
// API server
deleteAccount(req, res) {
  const id_user = req.params.id_user; 
  console.log(req)// Lấy thông tin ID từ đối tượng req.body

  const query = 'DELETE FROM duan.account WHERE id_user = ?'; // Câu truy vấn SQL để xóa tài khoản dựa trên ID
  const values = [id_user];

  connection.query(query, values, (error, results) => {
      if (error) {
          console.error('Error deleting account data: ' + error);
          res.status(500).json({ message: 'Error deleting account data' });
      } else {
          if (results.affectedRows > 0) {
              console.log('Account data deleted successfully.');
              res.status(200).json({ message: 'Account data deleted successfully' });
          } else {
              console.log('Account not found.');
              res.status(404).json({ message: 'Account not found' });
          }
      }
  });
}


    

  }
  module.exports = new AccountController();