import sequelize from "./db.js";
import Sequelize from 'sequelize';

const Order = sequelize.define('Orders',{
    order_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    unit_Price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    owner:{
        type: Sequelize.STRING,
        allowNull: false
    },
    status:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }

})

export default Order;
