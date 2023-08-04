const express = require('express');
const app = express();
const port = 4000;

const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const passport = require('passport');
const methodOverride = require('method-override');
const path = require('path');
const router = require('./Routes/index');
const { exec } = require('child_process');

app.use(express.json());
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine(
  '.hbs',
  handlebars.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    helpers: { sum: (a, b) => a + b },
  })
);

const filePath = "../mysql/Mysql2/index.mysql"; // Đường dẫn tới file mysql.js
exec(`node ${filePath}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing file: ${error}`);
      return;
    }
    // Khi file kết nối đã chạy thành công, bạn có thể tiếp tục khởi động server ở đây
    console.log('MySQL connection file executed successfully.');
  
    // Khởi động server ở đây
    // ...
  });
  // async function authenticateUser(token) {
  //   try {
  //     const decodedToken = await admin.auth().verifyIdToken(token);
  //     const uid = decodedToken.uid;
  //     // Thực hiện các hoạt động trong MySQL tại đây
  //     // Ví dụ: truy vấn cơ sở dữ liệu, thêm, sửa, xóa dữ liệu, vv.
  //     // Sử dụng connection.query() để thực hiện các truy vấn MySQL
  //   } catch (error) {
  //     console.error('Lỗi xác thực người dùng:', error);
  //   }
  // }
  
  // // Gọi hàm xác thực người dùng với token từ Firebase
  // const firebaseToken = 'your_firebase_token';
  // authenticateUser(firebaseToken);

app.use(passport.initialize());
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

router(app)

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
