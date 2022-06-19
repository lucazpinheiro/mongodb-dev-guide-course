import driversControllers from '../controllers/drivers-controllers.js'

export default (app) => {
  app.get('/api', (req, res) => {
    res.json({ message: 'up and running' })
  })
  app.get('/api/drivers', driversControllers.index)
  app.post('/api/drivers', driversControllers.create)
  app.put('/api/drivers/:id', driversControllers.update)
  app.delete('/api/drivers/:id', driversControllers.delete)
}