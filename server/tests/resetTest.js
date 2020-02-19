import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import 'dotenv';
import email from '../models/resetData';

chai.should();
chai.use(chaiHttp);

describe('test Reseting password, email', () => {
  it('should send an email to reset the password', (done) => {
    chai.request(app)
      .post('/reset')
      // .set('mailOption.to', 'firaduk@yahoo.com')
      .send(email[0])
      .end((err, res) => {
        console.log(res.body);

        expect(res).to.have.status(200);
        done();
      });
  });

  it('email not found in the database', (done) => {
    chai.request(app)
      .post('/reset')
      .send(email[1])
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        done();
      });
  });

  it('incorrect email formart', (done) => {
    chai.request(app)
      .post('/reset')
      .send(email[2])
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(400);
        done();
      });
  });
});
