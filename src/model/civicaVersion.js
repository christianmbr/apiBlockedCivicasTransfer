import mongoose, { Schema, model } from 'mongoose'

const civicaVersion = new Schema({
  version: {
    type: Number,
    required: true,
    unique: true
  }
},
{
  versionKey: false,
  timestamps: true
})

export default model('versiones', civicaVersion)