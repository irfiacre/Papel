import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import 'dotenv';
import dumbData from '../models/testData';

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

  it('Forbiden on admins can view all accounts', (done) => {
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
