import assert from 'assert'
import supertest from 'supertest'
import mongoose from 'mongoose'
import app from '../../src/app.js'

const Driver = mongoose.model('Driver')

describe('Drivers controller', (done) => {
  it('POST to /api/drivers creates a new driver', (done) => {
    Driver.count()
      .then(count => {
        supertest(app)
          .post('/api/drivers')
          .send({ email: 'test@test.com'})
          .end(() => {
            Driver.count().then(newCount => {
              assert(count + 1 === newCount)
              done()
            })
          })
      })
  })

  it('PUT to /api/drivers updates a existing driver', (done) => {
    const driver = new Driver({ email: 'e@e.com', driving: false })
    driver.save().then(() => {
      supertest(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ _id: driver._id }).then(updatedDriver => {
            assert(updatedDriver.driving === true)
            done()
          })
        })
    })
  })

  it('DELETE to /api/drivers deletes a driver', (done) => {
    const driver = new Driver({ email: 'e@e.com' })
    driver.save().then(() => {
      supertest(app)
        .delete(`/api/drivers/${driver._id}`)
        .end(() => {
          Driver.findOne({ _id: driver._id }).then(deletedDriver => {
            assert(deletedDriver === null)
            done()
          })
        })
    })
  })

  it('GET to /api/drivers finds drivers in a location', (done) => {
    const seattleDriver = new Driver({
      email: 'seattle@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-122.4759902, 47.6147628]
      }
    })
    const miamiDriver = new Driver({
      email: 'miami@test.com',
      geometry: {
        type: 'Point',
        coordinates: [-80.253, 25.791]
      }
    })

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        supertest(app)
          .get('/api/drivers?lng=-80&lat=25')
          .end((err, response) => {
           console.log(response.body)
           done()
          })
      })
  })
})