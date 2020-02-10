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
        done();
      });
  });


  it('email already exists', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(dumbData[1])
      .end((err, res) => {
        expect(res).to.have.status(409);
        done();
      });
  });

  it('should not sign-up user,email is not allowed to be empty', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(dumbData[2])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should not sign-up user,email must be a valid email', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(dumbData[3])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should not sign-up user, name must only contain alpha-numeric characters', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(dumbData[4])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res).to.have.status(400);
        done();
      });
  });
  it('should not signup, id not found', (done) => {
    chai.request(app)
      .post('/auth/signup')
      .send(dumbData[5])
      .end((err, res) => {
        expect(res.statusCode).to.equal(400);
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Test sign in', () => {
  it('should signin user', (done) => {
    chai.request(app)
      .post('/auth/signin')
      .send(dumbData[6])
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('password is invalid', (done) => {
    chai.request(app)
      .post('/auth/signin')
      .send(dumbData[7])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('email not found', (done) => {
    chai.request(app)
      .post('/auth/signin')
      .send(dumbData[8])
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('email is empty', (done) => {
    chai.request(app)
      .post('/auth/signin')
      .send(dumbData[9])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('password is empty', (done) => {
    chai.request(app)
      .post('/auth/signin')
      .send(dumbData[9])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});


describe('Test User create account', () => {
  it('should create new account', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .post('/accounts')
      .set('Authorization', token)
      .send(dumbData[11])
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('should create new account', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .post('/accounts')
      .set('Authorization', token)
      .send(dumbData[12])
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });
  it('Date must be a valid ISO 8601 date', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .post('/accounts')
      .set('Authorization', token)
      .send(dumbData[13])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
  it('type must be current or savings', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .post('/accounts')
      .set('Authorization', token)
      .send(dumbData[14])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
