import Food from "./food.js";
import Order from "./order.js";
import User from "./user.js";

User.hasMany(Order);
Order.belongsTo(User);

export {Food, Order, User};