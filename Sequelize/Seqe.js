const { Sequelize } = require('sequelize');

// Thay đổi các giá trị dưới đây tùy theo cấu hình cơ sở dữ liệu của bạn
const sequelize = new Sequelize('duan', 'root', 'quanbui2003', {
  host: '127.0.0.1',
  dialect: 'mysql', // Thay đổi loại cơ sở dữ liệu tại đây nếu bạn sử dụng loại khác
});

// Kết nối với cơ sở dữ liệu
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to the database.');
  })
  .catch((err) => {
    console.error('Failed to connect to the database:', err);
  });

module.exports = sequelize;
