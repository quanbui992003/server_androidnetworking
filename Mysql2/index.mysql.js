const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'quanbui2003',
    database: 'duan'
  });
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database: ' + err.stack);
      return;
    }
  
    console.log('Connected to MySQL database.');
  
    // Đặt các truy vấn tại đây
  
    connection.end((err) => {
      if (err) {
        console.error('Error closing MySQL database connection: ' + err.stack);
        return;
      }
  
      console.log('Disconnected from MySQL database.');
    });
  });
  