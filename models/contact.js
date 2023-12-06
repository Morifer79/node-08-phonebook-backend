import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError } from '../helpers/handleMongooseError.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false }
);

contactSchema.post('save', handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required name field' }),
  number: Joi.string()
    .required()
    .messages({ 'any.required': 'missing required phone field' }),
});

export const schemas = {
  addSchema,
};

export const Contact = model('contact', contactSchema);
