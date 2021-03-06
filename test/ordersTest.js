import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/index.js';
import {Order} from '../src/models/index.js';
import JWT from 'jsonwebtoken';

chai.should();
chai.use(chaiHttp);

let id;
const token = JWT.sign(
    {
        role: 'admin'
    },
    process.env.JWT_KEY,
    {expiresIn : '1h'}
)


describe('orders route', () => {
    
    before(async()=>{
        
        const newOrder = {
            name: "chicken",
            quantity: 2,
            unit_Price: 100,
            price: 100 * 2,
            status: false,
            foodid: null
        }
        await Order.sync({force: true});
        const order = await Order.create(newOrder);
        id = order.id;
        
    })

    describe('GET /orders/', () => {
        it('it should get a list of all orders', (done) => {
            chai.request(server)
                .get(`/orders`)
                .set('authorization', `bearer ${token}`)
                .end((err, res)=>{
                    res.should.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
                done();
                })
        });
    });

    describe('GET /orders/:ID', () => {
        it('it should get an individual order', (done) => {
            chai.request(server)
                .get(`/orders/${id}`)
                .set('authorization', `bearer ${token}`)
                .end((err, res)=>{
                    res.should.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                done();
                })
        });
        it('it should not get order: invlaid ID', (done) => {
            const id = 100;
            chai.request(server)
                .get(`/orders/${id}`)
                .set('authorization', `bearer ${token}`)
                .end((err, res)=>{
                    res.should.status(500);
                    res.should.be.json;
                done();
                })
        });
    });

    describe('PATCH /orders/:ID', () => {
        it('it should edit an order', (done) => {
            const newOrder = {status: true}
            chai.request(server)
                .patch(`/orders/${id}`)
                .send(newOrder)
                .set('authorization', `bearer ${token}`)
                .end((err, res)=>{
                    res.should.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                done();
                })
        });
            it('it should not edit an order: invalid ID', (done) => {
                const id = 100;
                const newOrder = {status: true}
                chai.request(server)
                    .patch(`/orders/${id}`)
                    .send(newOrder)
                    .set('authorization', `bearer ${token}`)
                    .end((err, res)=>{
                        res.should.status(500);
                        res.should.be.json;
                    done();
                    })
            });
    });
    

});
