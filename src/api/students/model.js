import mongoose, { Schema } from 'mongoose'

const studentsSchema = new Schema({
  firstName: {
    type: String,
    match: /^[a-zA-Z ]+$/,
    required: true,
  },
  lastName: {
    type: String,
    match: /^[a-zA-Z ]+$/,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  hobbies: {
    type: [{
      type: String,
    }],
    required: true,
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

studentsSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      birthDate: this.birthDate,
      hobbies: this.hobbies,
      photoUrl: this.photoUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Students', studentsSchema)

export const schema = model.schema
export default model
