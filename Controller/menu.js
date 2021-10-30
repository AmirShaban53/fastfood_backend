import logger from "../Middleware/logger.js";
import {Food} from '../models/index.js';
import fs from 'fs';


export default class Menu{

    static getFoodList = async(req, res) =>{
        try {
            const foodList = await Food.findAll({});
            logger.info('list of all food items');
            res.status(200).json(foodList);
        } 
        catch (error) {
            logger.error("server error ocurred",error);
            res.status(500).json({error: error.message});
        }
    }

    static addFood = async(req, res) =>{
        try {
            const {name, price} = req.body;
            await Food.create({name: name, price:price , image: req.file.path});
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
            if(typeof req.file !=='undefined'){
                const {name, price} = req.body;
                const data = {name: name, price: price, image: req.file.path, id:req.params.id};
                await Food.update(data, {where:{id: data.id}})
                logger.info('food has been updated');
                res.status(200).json("food has been updated!");
            }
            else{
                const {name, price} = req.body;
                const data = {name: name, price: price, id:req.params.id};
                await Food.update(data, {where:{id: data.id}})
                logger.info('food has been updated');
                res.status(200).json("food has been updated!");
            }
        } 
        catch (error) {
            logger.error("failed to update food",error);
            res.status(500).json({error: error.message});
        }
    }

    static deleteFood = async(req, res) =>{
        try {
            const id = req.params.id;
            const food = await Food.findOne({where:{id: id}});
            if(food == null || food == undefined)
            {
                logger.error(`food of ID:${id} doesnot exist`,error);
                return res.status(500).json({error: 'could not delete food'});
            }
            logger.info(food.image);
            fs.unlink(`./${food.image}`, (err) =>{ 
                if(err){
                    logger.error('image not found',err);
                    return
                }
                
            })
            await Food.destroy({where: {id: id}});

            logger.info('food has been deleted');
            return res.status(200).json("food has been deleted");
            
        } 
        catch (error) {
            logger.error("failed to delete food",error);
            res.status(500).json({error: error.message});
        }
    }

}