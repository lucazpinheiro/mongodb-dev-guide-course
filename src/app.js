import express from 'express'
import mongoose from 'mongoose'
import routes from './routes/routes.js'

const app = express()

if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://localhost/cuber')
}

app.use(express.json())

routes(app)

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message })
})

export default app
