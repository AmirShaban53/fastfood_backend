import sequelize from "./db.js";
import Sequelize from 'sequelize';

const Food = sequelize.define('foods',{
    food_id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
})

export default Food;