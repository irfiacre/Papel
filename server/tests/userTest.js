import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import 'dotenv';
import dumbData from '../models/testData';

chai.should();
chai.use(chaiHttp);

describe('test sign up', () => {  
  it('should signup user', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(dumbData[0])
      .end((err, res) => {
        expect(res).to.have.status(201);
      });
    done();
  });

  it('email already exists', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(dumbData[1])
      .end((err, res) => {
        expect(res).to.have.status(422);
      });
    done();
  });

  it('should not sign-up user,email is not allowed to be empty', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(dumbData[2])
      .end((err, res) => {
        expect(res).to.have.status(422);
      });
    done();
  });

  it('should not sign-up user,email must be a valid email', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(dumbData[3])
      .end((err, res) => {
        expect(res).to.have.status(422);
      });
    done();
  });

  it('should not sign-up user, name must only contain alpha-numeric characters', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(dumbData[4])
      .end((err, res) => {
        expect(res.statusCode).to.equal(422);
        expect(res).to.have.status(422);
      });
    done();
  });
});
