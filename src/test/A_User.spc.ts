import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('Automated Testing Of User Operations', () => {
    it('(Register) No information posted to (POST) :/user', (done)=>{
        chai.request(app)
        .post('/user')
        .set('content-type', 'application/json')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors.length).to.equal(6);
          done();
        });
    })

    it('(Register) Invalid data posted (username, email, password, confirm_password) to (POST) :/user', (done)=>{
        chai.request(app)
        .post('/user')
        .set('content-type', 'application/json')
        .send({
          username: "jhon foster", 
          first_name: "Jhon", 
          last_name: "Foster", 
          email: "test", 
          address: "test address", 
          password: "pas", 
          confirm_password: "passw"
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0].param).to.equal('username');
          expect(res.body.errors[1].param).to.equal('email');
          expect(res.body.errors[2].param).to.equal('password');
          expect(res.body.errors[3].param).to.equal('confirm_password');
          done();
        });
    })

    it('(Register) All valid information posted to (POST) :/user', (done)=>{
      chai.request(app)
      .post('/user')
      .set('content-type', 'application/json')
      .send({
        username: "jhonfoster", 
        first_name: "Jhon", 
        last_name: "Foster", 
        email: "jhonfoster@gmail.com", 
        address: "test address", 
        password: "password100!@", 
        confirm_password: "password100!@"
      })
      .end(async (err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
    })

    it('(Login) No login information posted to (POST) :/user/auth', (done)=>{
      chai.request(app)
      .post('/user/auth')
      .set('content-type', 'application/json')
      .send({})
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.length).to.equal(2);
        done();
      });
    })

    it('(Login) Invalid information posted to (POST) :/user/auth', (done)=>{
      chai.request(app)
      .post('/user/auth')
      .set('content-type', 'application/json')
      .send({
        username: "testuser1", 
        password: "123456"
      })
      .end(async(err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.success).to.equal(false);
        done();
      });
    })

    it('(Check Auth) Valid login check posted to (POST) :/user/auth', (done)=>{
      chai.request(app)
      .post('/user/auth')
      .set('content-type', 'application/json')
      .send({
        username: "jhonfoster", 
        password: "password100!@"
      })
      .end(async(err, res) => {
        expect(res.body.success).to.equal(true);
        // @ts-ignore
        global.token = res.body.token;
        done();
      });
    })

    it('(Check Auth) Invalid token pass (GET) :/user/auth', (done)=>{
      chai.request(app)
      .get('/user/auth')
      .set('x-auth-token', "this is a invalid token")
      .end(async(err, res) => {
        expect(res.body.errors.length).to.equal(1);
        done();
      });
    })

    it('(Regenerate Token) Refresh token (GET) :/user/auth/refresh', (done)=>{
      // @ts-ignore
      let token = global.token;
      chai.request(app)
      .get('/user/auth/refresh')
      .set('x-auth-token', token)
      .end(async(err, res) => {
        expect(res.body.success).to.equal(true);
        // @ts-ignore
        global.token = res.body.token;
        done();
      });
    })

    it('(Check Auth) Auth check with pass the token (GET) :/user/auth', (done)=>{
        // @ts-ignore
        let token = global.token;
        chai.request(app)
        .get('/user/auth')
        .set('x-auth-token', token)
        .end(async(err, res) => {
          expect(res.body.success).to.equal(true);
          done();
        });
    })
})

