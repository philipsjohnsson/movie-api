/**
 * Mongoose model User.
 *
 * @author Philip Jonsson
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const movieSchema = new mongoose.Schema({

  title: {
    type: String,
    required: [true, 'A movie title is required.'],
    unique: true
  },
  category: {
    type: String,
    required: [true, 'A movie needs a category']
  },
  releaseYear: {
    type: Number,
    required: [true, 'A release year is needed fo the movie']
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

movieSchema.virtual('id').get(function () {
  return this._id.toHexString()
})

/**
 * Checks if the password matches and if the user exists.
 *
 * @param {string} username - Username for login.
 * @param {string} password - Password for login.
 */
movieSchema.statics.authenticate = async function (username, password) {
  const user = await this.findOne({ username })

  // If no user found or password is wrong, throw an error.
  if (!(await bcrypt.compare(password, user?.password))) {
    throw new Error('Invalid credentials.')
  }

  // User found and password correct, return the user.
  return user
}

export const Movie = mongoose.model('Movie', movieSchema)
