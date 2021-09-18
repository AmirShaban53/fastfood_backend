import logger from "../Middleware/Logger.js";
import Food from '../models/food.js';


export default class Menu{

    static getFoodList = async(req, res) =>{
        try {
            const foodList = await Food.findAll({});
            logger.info('list of all food items');
            res.status(200).json({foodItems: foodList});
        } 
        catch (error) {
            logger.error("server error ocurred",error);
            res.status(500).json({error: error.message});
        }
    }

    static addFood = async(req, res) =>{
        try {
            const {name, price} = req.body;
            await Food.create({name: name, price:price});
            logger.info('new food created');
            res.status(201).json("new food created");
        } 
        catch (error) {
            logger.error("failed to create new food",error);
            res.status(500).json({error: error.message});
        }
    }

    static editFood = async(req, res) =>{
        try {
            const {name, price} = req.body;
            const data = {name: name, price: price, id:req.params.id};
            await Food.update(data, {where:{food_id: data.id}})
            logger.info('food has been updated');
            res.status(200).json("food has been updated!");
        } 
        catch (error) {
            logger.error("failed to update food",error);
            res.status(500).json({error: error.message});
        }
    }

    static deleteFood = async(req, res) =>{
        try {
            
            await Food.destroy({where: {food_id: req.params.id}})
            logger.info('food has been deleted');
            res.status(200).json("food has been deleted");
        } 
        catch (error) {
            logger.error("failed to delete food",error);
            res.status(500).json({error: error.message});
        }
    }

}