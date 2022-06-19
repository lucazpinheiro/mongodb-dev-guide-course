import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PointSchema = new Schema({
  type: {
    type: String,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    index: '2dsphere'
  }
})

// PointSchema.index({ geometry: '2dsphere' })

const DriverSchema = new Schema({
  email: {
    type: String, 
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema
})

DriverSchema.index({ geometry: '2dsphere' })

const Driver = mongoose.model('Driver', DriverSchema)

export default Driver