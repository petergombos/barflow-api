import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

describe('## Misc', () => {
  describe('# GET /health-check', () => {
    it('should return OK', (done) => {
      request(app)
        .get('/health-check')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal('OK');
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /404', () => {
    it('should return 404 status', (done) => {
      request(app)
        .get('/404')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# Error Handling', () => {
  //   it('should handle mongoose CastError - Cast to ObjectId failed', (done) => {
  //     request(app)
  //       .get('/users/56z787zzz67fc')
  //       .expect(httpStatus.INTERNAL_SERVER_ERROR)
  //       .then(res => {
  //         expect(res.body.message).to.equal('Internal Server Error');
  //         done();
  //       })
  //       .catch(done);
  //   });

    it('should handle express validation error - name is required', (done) => {
      request(app)
        .post('/auth/signup')
        .send({
          email: 'foo@bar.com',
          password: 'foobar'
        })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal('"name" is required');
          done();
        })
        .catch(done);
    });
  });
});
