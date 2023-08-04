const { DataTypes, Model } = require('sequelize');
const sequelize = require('../Sequelize/Seqe'); // Đối tượng sequelize đã được khởi tạo

class Category extends Model {}

Category.init(
  {
    id_category: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING, // Kiểu dữ liệu của trường image có thể thay đổi tùy theo yêu cầu của bạn
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'category' // Tên bảng trong CSDL
  }
);

module.exports = Category;
