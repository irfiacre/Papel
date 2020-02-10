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
});
