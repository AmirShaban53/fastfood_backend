import chai from"chai";
import chaiHttp from "chai-http";
import server from '../src/index.js';
import { Order, User, Food} from "../src/models/index.js";
import JWT from 'jsonwebtoken';
import 'dotenv/config.js';

chai.should();
chai.use(chaiHttp);

let userId;
let token; 


describe('user Routes', () => {
    
    before(async()=>{
        await Food.sync({force: true});
        await Order.sync({force: true});
        await User.sync({force: true});

        const user = await User.create({email:"user@gmail.com", password:"password"});
        const food = await Food.create({name:"water", price: 100});
        userId = user.id;
        token = JWT.sign(
            {
                id: userId,
                role: 'admin'
            },
            process.env.JWT_KEY,
            {expiresIn : '1h'}
        )
        
    })


    describe('POST /users/orders', () => {
        it('it should make or post a new order', (done) => {
            const food = {name: "water"};
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
                    res.body.should.be.a('array');
                done();
                });
        });
    });

});
