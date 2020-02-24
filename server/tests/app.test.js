import chai, { expect } from 'chai';
import { describe, it } from 'mocha';
import chaiHttp from 'chai-http';
import app from '../app';
import 'dotenv';
import dumbData from '../models/testData';

chai.should();
chai.use(chaiHttp);

describe('App.js test', () => {
  it('Incorrect Route', (done) => {
    chai.request(app)
      .post('/auth/sihh')
      .send(dumbData[0])
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});
