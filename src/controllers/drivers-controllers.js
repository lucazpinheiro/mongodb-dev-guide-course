import Driver from '../models/driver.js'

export default {
  index(req, res, next) {
    const { lat, lng } = req.query
    Driver.aggregate([{
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)]
        },
        spherical: true,
        maxDistance: 200000,
        distanceField: 'dist.calculated'
      }
    }]).then(drivers => {
      res.json(drivers)
    }).catch(next)
  },
  create(req, res, next) { 
    const driverProps = req.body
    Driver.create(driverProps)
      .then(driver => res.json(driver))
      .catch(next)
  },
  update(req, res, next) {
    const driverId = req.params.id
    const driverProps = req.body
    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.json(driver))
      .catch(next)
  },
  delete(req, res, next) {
    const driverId = req.params.id
    Driver.findByIdAndRemove({ _id: driverId })
      .then((driver) => res.status(204).json(driver))
      .catch(next)
  }
}