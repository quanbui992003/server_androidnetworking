const { DataTypes, Model } = require('sequelize');
const sequelize = require('../Sequelize/Seqe'); // Đối tượng sequelize đã được khởi tạo

class Product extends Model {}

Product.init(
  {
    id_product: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING, // Kiểu dữ liệu của trường image có thể thay đổi tùy theo yêu cầu của bạn
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    id_category: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'categories', // Tên bảng "categories" mà id_category liên kết tới
        key: 'id' // Tên trường trong bảng "categories" mà id_category liên kết tới
      }
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'product' // Tên bảng trong CSDL
  }
);

module.exports = Product;
