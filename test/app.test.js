import assert from 'assert'
import supertest from 'supertest'
import app from '../src/app.js'

describe('The express app', () => {
  it('handles a GET request to /api', (done) => {
    supertest(app)
      .get('/api')
      .end((err, res) => {
        assert.equal(res.body.message, 'up and running')
        done()
      })
  })
})