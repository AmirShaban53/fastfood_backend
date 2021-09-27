import sequelize from "./db.js";
import Sequelize from 'sequelize';

const Food = sequelize.define('food',{
    id:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
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
    image:{
        type: Sequelize.STRING,
        allowNull: true
    }
},{timestamps: false});

export default Food;