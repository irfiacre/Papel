import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import 'dotenv';

describe('Test for Authorisation', () => {
  it('You must sign in to continue', (done) => {
    chai.request(app)
      .post('/accounts')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('You must sign in to view', (done) => {
    chai.request(app)
      .get('/user/kd@kjs.dsu/accounts')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });

  it('You must login to proceed with specific account', (done) => {
    chai.request(app)
      .get('/accounts/1')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
  it('You must login to view user account transactions history', (done) => {
    chai.request(app)
      .get('/accounts/1/transactions')
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});


