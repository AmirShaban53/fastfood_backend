import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';
import Order from '../models/order.js';
import JWT from 'jsonwebtoken';

chai.should();
chai.use(chaiHttp);

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
            owner: 'that guy'
        }
        await Order.sync({force: true}).then(()=>{Order.create(newOrder)});
        
    })

    describe('GET /orders/', () => {
        it('it should get a list of all orders', (done) => {
            chai.request(server)
                .get(`/orders`)
                .set('authorization', `bearer ${token}`)
                .end((err, res)=>{
                    res.should.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                done();
                })
        });
    });

    describe('GET /orders/:ID', () => {
        it('it should get an individual order', (done) => {
            const id = 1;
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
    });

    describe('PATCH /orders/:ID', () => {
        it('it should edit an order', (done) => {
            const id = 1;
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
    });
    

});
