import chai from 'chai';
import { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

import ProductModel from '../models/schema/Product';

chai.use(chaiHttp);

describe('Automated Testing Of Product Operations', () => {
    it('(Create Product) No information posted to (POST) :/product', (done)=>{
        // @ts-ignore
        let token = global.token;
        chai.request(app)
        .post('/product')
        .set('content-type', 'application/json')
        .set('x-auth-token', token)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors.length).to.equal(4);
          done();
        });
    })

    it('(Create Product) Invalid data posted (price, status) to (POST) :/product', (done)=>{
        // @ts-ignore
        let token = global.token;
        chai.request(app)
        .post('/product')
        .set('content-type', 'application/json')
        .set('x-auth-token', token)
        .send({title: "Product Title", price: "20ajkskajska", status: "Foster", description: "this is a product details"})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0].param).to.equal('price');
          expect(res.body.errors[1].param).to.equal('status');
          done();
        });
    })

    it('(Create Product) Valid data posted (title, price, status, description) to (POST) :/product', (done)=>{
        // @ts-ignore
        let token = global.token;   
        chai.request(app)
        .post('/product')
        .set('content-type', 'application/json')
        .set('x-auth-token', token)
        .send({title: "Product Title", price: 200, status: true, description: "this is a product details"})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          //@ts-ignore
          global.product_id = res.body.data._id;
          done();
        });
    })

    it('(Update Product) Invalid data pass (price, status) to (PUT) :/product/:id', (done)=>{
        // @ts-ignore
        let token = global.token;
        //@ts-ignore
        let product_id = global.product_id;
        chai.request(app)
        .put(`/product/${product_id}`)
        .set('content-type', 'application/json')
        .set('x-auth-token', token)
        .send({title: "Product Title", price: "20ajkskajska", status: "Foster", description: "this is a product details"})
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.errors[0].param).to.equal('price');
          expect(res.body.errors[1].param).to.equal('status');
          done();
        });
    })

    it('(Update Product) Valid data pass to (PUT) :/product/:id', (done)=>{
        // @ts-ignore
        let token = global.token;
        //@ts-ignore
        let product_id = global.product_id;
        chai.request(app)
        .put(`/product/${product_id}`)
        .set('content-type', 'application/json')
        .set('x-auth-token', token)
        .send({title: "Product Title", price: 250, status: true, description: "this is a product details"})
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    })

    it('(Fetch Product) Fetch all products (GET) :/product', (done)=>{
      // @ts-ignore
      let token = global.token;
      chai.request(app)
      .get(`/product`)
      .set('content-type', 'application/json')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    })

    it('(Fetch Product) Fetch single product (GET) :/product/:id', (done)=>{
      // @ts-ignore
      let token = global.token;
      //@ts-ignore
      let product_id = global.product_id;
      chai.request(app)
      .get(`/product/${product_id}`)
      .set('content-type', 'application/json')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
    })

    it('(Delete Product) Delete product (DELETE) :/product/:id', (done)=>{
      // @ts-ignore
      let token = global.token;
      //@ts-ignore
      let product_id = global.product_id;
      chai.request(app)
      .delete(`/product/${product_id}`)
      .set('content-type', 'application/json')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(204);
        done();
      });
    })

    it('(Delete Product) Delete product with invalid id (DELETE) :/product/:id', (done)=>{
      // @ts-ignore
      let token = global.token;
      //@ts-ignore
      let product_id = global.product_id;
      chai.request(app)
      .delete(`/product/${product_id}`)
      .set('content-type', 'application/json')
      .set('x-auth-token', token)
      .end(async(err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.errors.param).to.equal('id');
        await ProductModel.deleteMany({});
        done();
      });
    })
})

