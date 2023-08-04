const accountRoutes = require("./Account.Routes");
const productRoutes = require("./Product.Route");
const categoryRoutes = require("./Category.Route");

const Account = require("./Account.Routes")

function routes(app) {
  app.use("/", accountRoutes);
  app.use("/product", productRoutes);
  app.use("/account", Account);
  app.use("/category", categoryRoutes);


}

module.exports = routes;

