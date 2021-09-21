import chai from"chai";
import chaiHttp from "chai-http";
import server from '../index.js';
import Order from "../models/order.js";
import Food from "../models/food.js";
import JWT from 'jsonwebtoken';
import 'dotenv/config.js'

chai.should();
chai.use(chaiHttp);

const token = JWT.sign(
    {
        role: 'admin'
    },
    process.env.JWT_KEY,
    {expiresIn : '1h'}
)


const food = {
    name: 'rice',
    quantity: 2,
    unit_Price: 100,
    price: 100* 2,
    status: false,
    owner: 'that guy'
}

describe('user Routes', () => {
    
    before(async()=>{
        await Food.sync({force: true});
        await Order.sync({force: true});
        await Food.create({name: food.name, price: food.unit_Price});
    })


    describe('POST /users/orders', () => {
        it('it should make or post a new order', (done) => {
            chai.request(server)
                .post('/users/orders')
                .send(food)
                .set('authorization', `bearer ${token}`)
                .end((err, res)=>{
                    res.should.have.status(201);
                    res.should.be.json;
                    
                done();
                })
        });
        it('it should not make an order: no data entry', (done) => {
            const foodName = {}
            chai.request(server)
                .post('/users/orders')
                .send(foodName)
                .set('authorization', `bearer ${token}`)
                .end((err, res)=>{
                    res.should.have.status(500);
                    res.should.be.json;
                    
                done();
                })
        });
        it('it should not make an order: invalid food name', (done) => {
            const foodName = {name: 'greens'};
            chai.request(server)
                .post('/users/orders')
                .send(foodName)
                .set('authorization', `bearer ${token}`)
                .end((err, res)=>{
                    res.should.have.status(500);
                    res.should.be.json;
                    
                done();
                })
        });
    });
    



    describe('GET /users/orers', () => {
        it('it should get a list of all past order', (done) => {
            chai.request(server)
                .get('/users/orders')
                .set('authorization', `bearer ${token}`)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                done();
                });
        });
    });

});
