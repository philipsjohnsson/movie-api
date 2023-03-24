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
    required: [true, 'A movie title is required.']
  },
  category: {
    type: String,
    required: [true, 'A movie needs a category']
  },
  releaseYear: {
    type: Number,
    required: [true, 'A release year is needed for the movie']
  },
  createdByUserId: {
    type: String,
    required: [true, 'A createdByUserId is required for the movie'],
    immutable: true // makes it not changeable.
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

const convertOptions = {
  virtuals: true,
  versionKey: false,
  /**
   * Performs a transformation of the resulting object to remove sensitive information.
   *
   * @param {object} doc - The mongoose document which is being converted.
   * @param {object} ret - The plain object representation which has been converted.
   */
  transform: (doc, ret) => {
    delete ret._id
  }
}

movieSchema.set('timestamps', true)
movieSchema.set('toObject', convertOptions)
movieSchema.set('toJSON', convertOptions)

export const Movie = mongoose.model('Movie', movieSchema)
