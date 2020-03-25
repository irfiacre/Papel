import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import 'dotenv';
import dumbData3 from './testData/testData3';

chai.should();
chai.use(chaiHttp);

describe('Test For Debiting bank account', () => {
  it('cashier use only', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .post('/transactions/201225/debit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it('should debit user bank account', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201225/debit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Incorrect date format', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201225/debit')
      .set('Authorization', token)
      .send(dumbData3[1])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Date not found', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201225/debit')
      .set('Authorization', token)
      .send(dumbData3[2])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Amount should be a number', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201225/debit')
      .set('Authorization', token)
      .send(dumbData3[3])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Amount is required', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201225/debit')
      .set('Authorization', token)
      .send(dumbData3[4])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('account number not found', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/2025/debit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('account status should be active', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201231/debit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('account status should be active2', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201901/debit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Insufficient funds', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/200231/debit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});


describe('Test For Crediting bank account', () => {
  it('cashier use only', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .post('/transactions/201225/credit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
  it('should credit user bank account', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201225/credit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('Incorrect date format', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201225/credit')
      .set('Authorization', token)
      .send(dumbData3[1])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Date not found', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201225/credit')
      .set('Authorization', token)
      .send(dumbData3[2])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Amount should be a number', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201225/credit')
      .set('Authorization', token)
      .send(dumbData3[3])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Amount is required', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201225/credit')
      .set('Authorization', token)
      .send(dumbData3[4])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('account number not found', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/2025/credit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('account status should be active', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201231/credit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('account status should be active2', (done) => {
    const token = process.env.CASHIER_TOKEN;
    chai.request(app)
      .post('/transactions/201901/credit')
      .set('Authorization', token)
      .send(dumbData3[0])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
