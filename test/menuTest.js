import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';
import JWT from 'jsonwebtoken';
import 'dotenv/config.js';
import fs from 'fs';


import { Food } from '../models/index.js';


const should = chai.should();
chai.use(chaiHttp);
let id;
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
        const testFood = await Food.create({name:"water", price: 100});
        id = testFood.id;
    })
    

    describe('GET /menu/', () => {
        it('it should get all the food items', (done) => {
            chai.request(server)
                .get('/menu')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('array');
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
                .set('authorization', `bearer ${token}`)
                .set('Accept', 'application/json')
                .field('Content-Type', `multipart/form-data`)
                .field({name: food.name, price: food.price})
                .attach('image', './test/img.jpg')
                .end((err, res) => {
                    res.should.have.status(201);
                    res.should.be.json;
                done();
                })
        }); 
        it('it shoud not add a new food because there is no name', (done) => {
            const food = {price: 15000};

            chai.request(server)
                .post('/menu')
                .set('authorization', `bearer ${token}`)
                .field('Content-Type', `multipart/form-data`)
                .field({price: food.price})
                .attach('image', './test/img.jpg')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.should.be.json;
                done();
                })
        }); 
        it('it shoud not add a new food because there is no price', (done) => {
            const food = {name: 'rice'};

            chai.request(server)
                .post('/menu')
                .set('authorization', `bearer ${token}`)
                .field('Content-Type', `multipart/form-data`)
                .field({name: food.name})
                .attach('image', './test/img.jpg')
                .end((err, res) => {
                    res.should.have.status(500);
                    res.should.be.json;
                done();
                })
        });
        it('it shoud not add a new food because there is no data', (done) => {
            const food = {};

            chai.request(server)
                .post('/menu')
                .send(food)
                .set('authorization', `bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.should.be.json;
                done();
                })
        });
    })

    describe('PATCH /menu/:ID', () => {
        it('it should edit an existing food', (done) => {

            const food = {name: 'chicken'}
            chai.request(server)
                .patch(`/menu/${id}`)
                .send(food)
                .set('authorization', `bearer ${token}`)
                // .field('Content-Type', `multipart/form-data`)
                // .field({name: food.name})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                done();
                })

        }); 
        it('it should not edit food because of invalid data entry', (done) => {
            
                const food = {name: 100, price:'tree'}
                chai.request(server)
                    .patch(`/menu/${id}`)
                    .send(food)
                    .set('authorization', `bearer ${token}`)
                    .end((err, res) => {
                        res.should.have.status(500);
                        res.should.be.json;
                    done();
                    })
        });
    });

    describe('DELETE /menu/', () => {
        it('it should delete a food item', (done) => {
            chai.request(server)
                .delete(`/menu/${id}`)
                .set('authorization', `bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.be.json;
                done();
                })
        }); 
        it('it not should delete a food item because of invalid ID', (done) => {
            const id = 100
            chai.request(server)
                .delete(`/menu/${id}`)
                .set('authorization', `bearer ${token}`)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.should.be.json;
                done();
                })
        });
        
    })

})