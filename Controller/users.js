import logger from "../Middleware/logger.js";
import {Order, Food, User} from "../models/index.js";

export default class users{


    static addOrder = async(req, res) =>{
        try {
            const {name} = req.body;
            const food = await Food.findOne({where:{name: name}});
            if(food == null || food == undefined){
                logger.error('food doesnt exist in database');
                return res.status(500).json({error:'this food is not servered here'});
            }
            else{
                
                const user = await User.findOne({where:{id: req.userData.id}});
                const newOrder = {
                    name: food.name,
                    quantity: 2,
                    unit_Price: food.price,
                    price: food.price* 2,
                    status: false,
                    foodId: food.id
                }
                user.createOrder(newOrder);
                logger.info('new order made by user');
                res.status(201).json("order created successfully!");
            }
        } 
        catch (error) {
            logger.error('failed to create order',error);
            res.status(500).json({error: error.message});
        }
    }

    static getOrderHistory = async(req, res) =>{
        try {
            const completedOrders = await Order.findAll({where:{status: true}});
            logger.info('this your list of completed orders');
            res.status(200).json(completedOrders);
        } 
        catch (error) {
            logger.error('failed to find order history',error);
            res.status(500).json({error: error.message});
        }
    }

}