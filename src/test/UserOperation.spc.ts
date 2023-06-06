import chai from 'chai';
import { expect, should } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);

describe('User Registration, Login, Info, Token Regenerate Test Case', () => {
    // it('message', ()=>{
    //     expect(validation.checkEmailAddress('test@domain.com')).to.equal(true)
    // })

    it('Registration (POST) :/user', (done)=>{
        chai.request(app)
        .post('/user')
        .set('content-type', 'application/json')
        .send({myparam: 'test'})
        .end((err, res) => {
          expect(res.status).to.equal(400);
              // res.should.have.status(400);
            //   res.body.should.be.a('array');
            //   res.body.length.should.be.eql(0);
          done();
        });
    })
})