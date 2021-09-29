import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';
import User from '../models/user.js';

chai.should();
chai.use(chaiHttp);

describe('auth route', () => {

    before(async()=>{
        await User.sync({force: true});
        await User.create({email:"test2@test.com",password: "password"})
    })

    describe('POST /auth/signup', () => {
        it('it should fail because there is no user email', (done) => {
            const newUser = {};

            chai.request(server)
                .post('/auth/signup')
                .send(newUser)
                .end((err, res)=>{
                    res.should.have.status(500);
                    res.should.be.json;
                done();
                })
        });
        it('it should create a new user', (done) => {
            const newUser = {
                email: "test@test.com",
                password: "password"
            }
            chai.request(server)
                .post('/auth/signup')
                .send(newUser)
                .end((err, res)=>{
                    res.should.have.status(201);
                    res.should.be.json;
                done();
                
                })
        });
        it('it should fail because user already exists', (done) => {
            const newUser = {
                email: "test2@test.com",
                password: "password"
            }
            chai.request(server)
                .post('/auth/signup')
                .send(newUser)
                .end((err, res)=>{
                    res.should.have.status(409);
                    res.should.be.json;
                done();
               
                })
        });
        it('it should fail because there is no password', (done) => {
            const newUser = {
                email: "test1@test.com"
            }
            chai.request(server)
                .post('/auth/signup')
                .send(newUser)
                .end((err, res)=>{
                    res.should.have.status(500);
                    res.should.be.json;
                done();
                })
        });
        
    });

    describe('POST /auth/login', () => {
        it('it should login an existing user', (done) => {
            const user = {
                email: "test@test.com",
                password: "password"
            }
            chai.request(server)
                .post('/auth/login')
                .send(user)
                .end((err, res)=>{
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.have.property('token');
                    done();
                })
        });
        it('it should not login a user because there is no input', (done) => {
            const user = {};
            
            chai.request(server)
                .post('/auth/login')
                .send(user)
                .end((err, res)=>{
                    res.should.have.status(500);
                    res.should.be.json;
                    done();
                })
        });
        it('it should not login a user because email doesnot exist', (done) => {
            const user = {
                email: "noUser@test.com",
                password: "password"
            }
            chai.request(server)
                .post('/auth/login')
                .send(user)
                .end((err, res)=>{
                    res.should.have.status(401);
                    res.should.be.json;
                    done();
                })
        });
        it('it should not login an existing user because password is incorrect', (done) => {
            const user = {
                email: "test@test.com",
                password: "wrong"
            }
            chai.request(server)
                .post('/auth/login')
                .send(user)
                .end((err, res)=>{
                    res.should.have.status(401);
                    res.should.be.json;
                    done();
                })
        });
        
    });
});


