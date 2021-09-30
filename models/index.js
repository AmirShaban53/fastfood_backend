import Food from "./food.js";
import Order from "./order.js";
import User from "./user.js";

User.hasMany(Order);
Order.belongsTo(User);

Food.hasMany(Order);
Order.belongsTo(Food);

export {Food, Order, User};