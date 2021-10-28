import sequelize from "./db.js";
import Sequelize from 'sequelize';

const User = sequelize.define("users",{
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV1,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    role:{
        type: Sequelize.STRING,
        allowNull: true
    }
}, {timestamps: false});


export default User;
