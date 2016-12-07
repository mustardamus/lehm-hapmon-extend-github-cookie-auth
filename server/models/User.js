'use strict'

module.exports = function (mongoose) {
  const name = 'User'
  const schema = new mongoose.Schema({
    // relatedModelId: { type: mongoose.Schema.ObjectId },
    username: { type: String, required: true, unique: true },
    token: { type: String },
    profile: { type: Object }
  }, {
    timestamps: true
  })

  schema.set('toJSON', {
    transform: (doc, obj, options) => {
      delete obj.token
      return obj
    }
  })

  return mongoose.model(name, schema)
}
