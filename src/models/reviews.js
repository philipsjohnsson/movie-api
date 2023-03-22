/**
 * Mongoose model User.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const ReviewSchema = new mongoose.Schema({
  grade: {
    type: Number,
    required: [true, 'A review needs a grade between 1-5'],
    min: 1,
    max: 5
  },
  movieId: {
    type: String,
    required: [true, 'A movie needs a movieId']
  },
  description: {
    type: String,
    maxlength: [200, 'The review description can`t be longer then 200 characters.']
  },
  createdById: {
    type: String,
    required: [true, 'The review needs a createdById']
  }
}, {
  timestamps: true,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.__v
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

ReviewSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

/**
 * Checks if the password matches and if the user exists.
 *
 * @param {string} username - Username for login.
 * @param {string} password - Password for login.
 */
ReviewSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  // If no user found or password is wrong, throw an error.
  if (!(await bcrypt.compare(password, user?.password))) {
    throw new Error('Invalid credentials.')
  }

  // User found and password correct, return the user.
  return user
}

export const Review = mongoose.model('Review', ReviewSchema)