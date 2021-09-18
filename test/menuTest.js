process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';
import JWT from 'jsonwebtoken';
import 'dotenv/config.js'

import Food from '../models/food.js';


chai.should();
chai.use(chaiHttp);

const token = JWT.sign(
    {
        role: 'admin'
    },
    process.env.JWT_KEY,
    {expiresIn : '1h'}
)

describe('menu route', () => {

    before(async()=>{
        await Food.sync({force: true});
    })
    

    describe('GET /menu/', () => {
        it('it should get all the food items', (done) => {
            chai.request(server)
                .get('/menu')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                done();
                })
        }); 
    })

    describe('POST /menu/', () => {
        it('it shoud add a new food', (done) => {
            const food = {
                name: 'meat',
                price: 15000
            }

            chai.request(server)
                .post('/menu')
                .send(food)
                .set('authorization', `bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.json;
                done();
                })
        }); 
    })

    describe('PATCH /menu/:ID', () => {
        it('it should edit an existing food', (done) => {
            const food = {
                name: 'chicken',
                price: 10000
            }
            const id = 1;
            chai.request(server)
                .patch(`/menu/${id}`)
                .send(food)
                .set('authorization', `bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                done();
                })
        }); 
    })

    describe('DELETE /menu/', () => {
        it('it should delete a food item', (done) => {
            const id = 1
            chai.request(server)
                .delete(`/menu/${id}`)
                .set('authorization', `bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                done();
                })
        }); 
    })

})