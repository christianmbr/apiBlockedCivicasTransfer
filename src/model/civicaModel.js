import mongoose, { Schema, model } from 'mongoose'

const CivicaBlackList = new Schema({
  CAR_ID: {
    type: Number,
    required: true,
    unique: true
  },
  LRE_STATUS: {
    type: Number,
    required: true
  },
  LRE_VERSAO: {
    type: Number
  },
  LRE_ID: {
    type: Number,
    required: true
  }
},
{
  versionKey: false,
  timestamps: true
})

export default model('civica', CivicaBlackList)