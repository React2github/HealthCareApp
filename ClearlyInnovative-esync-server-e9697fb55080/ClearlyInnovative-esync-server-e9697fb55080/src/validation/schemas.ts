import Joi from 'joi'

export const registerValidation = (data: any) => {
  const schema = Joi.object({
    first: Joi.string().min(3).required(),
    last: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    username: Joi.string().required(),
    role: Joi.string().required(),
    jobTitle: Joi.string().min(3).required(),
    password: Joi.string().min(3).required(),
    phone: Joi.string().required(),
  })
  return schema.validate(data)
}

export const loginValidation = (data: any) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  })
  return schema.validate(data)
}