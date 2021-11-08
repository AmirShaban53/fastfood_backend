import sequelize from "./db.js";
import Sequelize from 'sequelize';

const Order = sequelize.define("orders",{
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,

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
    status:{
        type: Sequelize.BOOLEAN,
        allowNull: false
    }

}, {timestamps: false});

export default Order;
