"use strict";

import request from 'supertest';
import should from 'should';
import app from '../app';

const port = 4000;
let appServer;
let statusCode;
let resBody;

describe('GET /private/health', () => {

  before((done) => {
      appServer = app(port);
      request(appServer)
          .get('/private/health')
          .end(function(err, res) {
              if (err) {
                  return done(err);
              }
              statusCode = res.statusCode;
              done();
          });
  });

  after(() => {
    appServer.server.close();
  });

  it('Should return 200 Status for Health Check', () => {
    should(statusCode).equal(200);
  });

});


describe('GET /HelloWorld', () => {

  before((done) => {
      appServer = app(port);
      request(appServer)
          .get('/helloworld')
          .set('Accept', 'text/html')
          .expect('Content-Type', 'text/html; charset=utf-8')
          .end(function(err, res) {
              if (err) {
                  return done(err);
              }
              statusCode = res.statusCode;
              resBody = res.text;
              done();
          });
  });

  after(() => {
    appServer.server.close();
  });

  it('Should return 200 Status for HelloWorld', () => {
    should(statusCode).equal(200);
  });

  it('Should return HelloWorld', () => {
    resBody.should.match(/Hello World/);
  });

});
