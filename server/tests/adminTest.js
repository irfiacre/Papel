import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import 'dotenv';
import dumbData2 from '../models/testData2';

chai.should();
chai.use(chaiHttp);

describe('Test For admin to view accounts', () => {
  it('should show all user bank accounts', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .get('/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should show all ACTIVE user bank accounts', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .get('/accounts?status=active')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should show all DORMANT user bank accounts', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .get('/accounts?status=dormant')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should show status must be active or dormant', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .get('/accounts?status=dorm')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('Forbidden only admins can view all accounts', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .get('/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(403);
        done();
      });
  });
});


describe('Test For admin to activate or deactivate', () => {
  it('should Activate account', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .patch('/account/201225')
      .set('Authorization', token)
      .send(dumbData2[5])
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should Activate account also', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .patch('/account/201201')
      .set('Authorization', token)
      .send(dumbData2[6])
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should Deactivate account', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .patch('/account/201231')
      .set('Authorization', token)
      .send(dumbData2[6])
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('Account must be an integer', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .patch('/account/hjhdjfdj')
      .set('Authorization', token)
      .send(dumbData2[8])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});


describe('Test For admin to DELETE account', () => {
  it('should DELETE account', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .delete('/accounts/201201')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should NOT DELETE account, account number must be an integer', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .delete('/accounts/kjkfd')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should NOT DELETE account,account number not found', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .delete('/accounts/128')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});


describe('Test For admin to create a new user', () => {

  it('should not Create new user, email already exist', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .post('/auth/create')
      .set('Authorization', token)
      .send(dumbData2[0])
      .end((err, res) => {
        console.log(res.body); 
        expect(res).to.have.status(409);
        done();
      });
  });
  it('should Create new user', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .post('/auth/create')
      .set('Authorization', token)
      .send(dumbData2[1])
      .end((err, res) => {
        console.log(res.body); 
        console.log(res.body); 
        expect(res).to.have.status(201);
        done();
      });
  });
  it('invalid email', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .post('/auth/create')
      .set('Authorization', token)
      .send(dumbData2[2])
      .end((err, res) => {
        console.log(res.body); 
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Invalid email2', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .post('/auth/create')
      .set('Authorization', token)
      .send(dumbData2[3])
      .end((err, res) => {
        console.log(res.body); 
        expect(res).to.have.status(400);
        done();
      });
  });
  it('Invalid first name', (done) => {
    const token = process.env.ADMIN_TOKEN;
    chai.request(app)
      .post('/auth/create')
      .set('Authorization', token)
      .send(dumbData2[4])
      .end((err, res) => {
        console.log(res.body); 
        expect(res).to.have.status(400);
        done();
      });
  });
});
