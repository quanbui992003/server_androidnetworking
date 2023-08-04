const { DataTypes, Model } = require('sequelize');
const sequelize = require('../Sequelize/Seqe'); // Đối tượng sequelize đã được khởi tạo

class Account extends Model {}

Account.init(
  {
    id_user: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pass: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true // Cho phép giá trị NULL nếu không có tên
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true // Cho phép giá trị NULL nếu không có số điện thoại
    },
    role: {
      type: DataTypes.ENUM('admin', 'user'),
      allowNull: false,
      defaultValue: 'user'
    }
  },
  {
    sequelize,
    modelName: 'Account',
    tableName: 'account' // Tên bảng trong CSDL
  }
);

module.exports = Account;
