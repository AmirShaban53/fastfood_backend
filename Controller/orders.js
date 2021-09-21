import logger from "../Middleware/logger.js";
import Order from "../models/order.js";

export default class orders{

    static getOrderList = async(req, res)=>{
        try {
            const orderlist = await Order.findAll({});
            logger.info('this is a list of all the orders');
            res.status(200).json({orders: orderlist});
        } 
        catch (error) {
            logger.error('failed to get list of orders',error);
            res.status(500).json({error: error.message});
        }
    }

    static getOrder = async(req, res)=>{
        try {
            const order = await Order.findOne({where:{order_id: req.params.id}})
            if(order == null || order == undefined){
                logger.error('invalid order ID');
                return res.status(500).json({error: 'failed to get order'});
            }
            logger.info('this is an individual order request');
            res.status(200).json({order: order});
        } 
        catch (error) {
            logger.error('failed to get individual order',error);
            res.status(500).json({error: error.message});
        }
    }

    static editOrder = async(req, res)=>{
        try {
            const data = {status: true}
            const orderID = await Order.findOne({where:{order_id: req.params.id}})
            if(orderID == null || orderID == undefined){
                logger.error('invalid order ID');
                return res.status(500).json({error: 'failed to get order'});
            }
            const order = await Order.update(data, {where:{order_id: req.params.id}})
            logger.info(`${order.name} has been successfully updated!`);
            res.status(200).json({message: `${order.name} has been successfully updated!`});
        } 
        catch (error) {
            logger.error('failed to update individual order,',error);
            res.status(500).json({error: error.message});
        }
    }
}