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

describe('Test Accounts view', () => {
  it('should show all accounts', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .get('/user/fia@mail.com/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should not  show  any accounts', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .get('/user/d@kjs.dsu/accounts')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe('Test for specific account view', () => {
  it('should show specific account', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .get('/accounts/1')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it('specific account not found', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .get('/accounts/1000')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('specific account number must be an interger', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .get('/accounts/hghghghgg')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});

describe('Test for view of account transactions history', () => {
  it('sould show user account transactions history', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .get('/accounts/1/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('account number not found', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .get('/accounts/100/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
  it('account number must be an interger', (done) => {
    const token = process.env.CLIENT_TOKEN;
    chai.request(app)
      .get('/accounts/weoioew/transactions')
      .set('Authorization', token)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
