import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../index.js';
import User from '../models/user.js'

chai.should();
chai.use(chaiHttp);

describe('auth route', () => {

    before(async()=>{
        await User.sync({force: true});
    })

    describe('POST /auth/signup', () => {
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
    });
    
});


